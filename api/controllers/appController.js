const authService = require("../services/authService.js");
const config = require("../../config/env");

class AppController {
  constructor(model) {
    this._model = model;
    this.create = this.create.bind(this);
  }
  create(req, res, next) {
    let obj = req.body.data;
    
    this._model.create(obj)
      .then((savedObject) => {
        if(req.path === "/register") {
          const token = authService.issueToken({
            exp: (Date.now() / 1000) + config.jwtExpirationInterval, // expire date in ceconds, now 2 hour
            id: savedObject.id
          });
          return res.ok({ Authorization: `Bearer ${token}` });
        }
        else return res.ok({ data: savedObject });
      })
      .catch(err => {
        return res.forbidden(err.message)
      });
  }
};

module.exports = AppController;