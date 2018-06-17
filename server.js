const app = require("./config/express.js");
const sequelize = require("./config/database.js");
const connection = require("./config/env");

sequelize
.sync({
  force: true,
  logging: true
})
//.authenticate()
  .then(() => {    
    console.log('Database connection has been established successfully.');
    app.listen(connection.port, function(){
      console.log(":: API REST SERVER IN http://127.0.0.1:" + connection.port + "/");
    })
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });