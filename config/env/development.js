
module.exports = {
  //db
  username: "root",
  password: "e27max60w",
  database: "express_db",
  host: "localhost",
  dialect: "mysql",
  //global
  env: "development",
  port: 3030,
  jwtSecret: "secret 123",
  jwtExpirationInterval: 120*60,
  logs: "combined",
  logDirectory: `${__dirname.split("/config/env")[0]}/logs`
}