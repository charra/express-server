const { promisify } = require("util");
const bcrypt = require("bcrypt");
const authService = require("../services/authService.js");
const config = require("../../config/env");
const Schedule = require("../models/Schedule");
const User = require("../models/User");

class UserController  {
  create(req, res, next) {
    let obj = req.body.data;
    return User.create(obj)
      .then((savedObject) => {
        const token = authService.issueToken({
          exp: (Date.now() / 1000) + config.jwtExpirationInterval, // expire date in ceconds, now 2 hour
          userId: savedObject.userId
        });
        return res.ok({ Authorization: `Bearer ${token}` });
      })
      .catch(err => {
        return res.forbidden(err)
      });
  }
  login(req, res, next) {
    const { email, password } = req.body.data;
    return User.findOne({where: {email: email}})
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
                  userId: user.userId
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