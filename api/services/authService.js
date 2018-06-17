const jwt = require("jsonwebtoken");
const config = require("../../config/env");

module.exports = {
  issueToken: function (payload) {
    const token = jwt.sign(payload, config.jwtSecret);
    return token;
  },

  verifyToken: function (token, verified) {
    return jwt.verify(token, config.jwtSecret, {}, verified);
  },

  decodeToken: function (token) {
    return jwt.decode(token);
  }
};