module.exports = {
  world: function(req, res, next) {
    return res.json({ msg: "Hello World!" });
  }
};

