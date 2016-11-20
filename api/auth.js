var User = require('../models/User.js');
var keys = require('../env_vars.js');

module.exports = function(passport) {
    return {
        register: function(req, res) {
            if (req.body.token !== keys.newAccountToken) {
                res.status(403).json({});
                return;
            }

            User.register(new User({ username: req.body.username }), req.body.password, function(err, account) {
                if (err) {
                    console.log(err);
                    console.log(account);
                    return res.status(401).json({ account: account });
                }
                passport.authenticate('local')(req, res, function() {
                    res.status(200).json(req.user);
                });
            });
        },
        login: function(req, res) {
            passport.authenticate('local')(req, res, function() {
                res.status(200).json(req.user)
            });
        },
        logout: function(req, res) {
            req.logout();
            res.redirect('/');
        },
        getCurrentUser: function(req, res) {
            if (req.user) {
                res.status(200).json({ user: req.user });
            } else {
                res.status(403).json({});
            }
        }
    };
};
