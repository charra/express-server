const config = require("../../config/env");

class ConfigController  {
  getCategories(req, res, next) {
    return res.ok({ scheduleCategories: config.scheduleCategories });
  }
}

module.exports = ConfigController;