const database = require("../../config/database.js");

module.exports = function(req, res, next) {
  const { email, password } = req.body.data;
  database.User.findOne({ where: { email: email } })
    .then(user => {
      if (user) {
        res.forbidden("User already exists");
      }
      else return next();
    })
}