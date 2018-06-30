const authService = require('../services/authService');
const database = require("../../config/database.js");

module.exports = (req, res, next) => {
  let tokenToVerify;

  if (req.headers.authorization) {
    const parts = req.headers.authorization.split(' ');
    if (parts.length === 2) {
      const scheme = parts[0];
      const credentials = parts[1];
      if (/^Bearer$/.test(scheme)) {
        tokenToVerify = credentials;
      }
    }
  }

  return authService.verifyToken(tokenToVerify, (err, thisToken) => {
    if (err) return res.unauthorized();
    else if (thisToken) {
      return database.User.findOne({where: { userId: thisToken.userId }})
        .then((userDb) => {
          if(userDb) {
            req.user = userDb;
            return next();
          }
          else return res.unauthorized(); //not show if user not found
        })
        .catch(err => {
          return res.serverError();
        });
    }
  });
};
