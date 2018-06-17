const { promisify } = require("util");
const bcrypt = require("bcrypt");
const authService = require("../services/authService.js");
const AppController = require('./appController.js');
const config = require("../../config/env");

class UserController extends AppController {
  constructor(model) {
    super(model);
    this.login = this.login.bind(this);
  }
  login(req, res, next) {
    const { email, password } = req.body.data;
    return this._model.findOne({where: {email: email}})
      .then(user => {
        if (!user) {
          throw new Error("User not found");
        }
        else {
          return bcrypt.compare(password, user.password)
            .then(result => {
              if (!result) {
                throw new Error("Invalid password or email");
              }
              else {
                const token = authService.issueToken({
                  exp: (Date.now() / 1000) + config.jwtExpirationInterval, // expire date in ceconds, now 2 hour
                  id: user.id
                });
                return res.ok({ Authorization: `Bearer ${token}` })
              }
            });
        }
      })
      .catch(err => {
        return res.forbidden(err.message)
      });
  }
}

module.exports = UserController;