module.exports = {
    world: function(req, res, next) {
        return res.json({ msg: "Hello World!" });
    },
    email: function(req, res, next) {
        return res.sendfile('public/emailGen.html');
    }
};
