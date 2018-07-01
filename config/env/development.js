const dbConfig = require("./database.json");
module.exports = {
  //db
  db: dbConfig,
  //global
  env: "development",
  port: 3030,
  jwtSecret: "secret 123",
  jwtExpirationInterval: 120*60,
  logs: "combined",
  logDirectory: `${__dirname.split("/config/env")[0]}/logs`,
  scheduleCategories: ["HOME_WORK", "OTHER"]
}