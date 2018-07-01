const Sequelize = require('sequelize');
const config = require("./env");
const modelsModules = require("../api/models");

const connection = config.db[config.env];

let models = {};

(function(config) {
  if (Object.keys(models).length && !force) {
    return models;
  }

  const sequelize = new Sequelize(
    connection.database,
    connection.user,
    connection.password, {
      host: connection.host,
      dialect: connection.dialect,
      pool: {
        max: 5,
        min: 0,
        idle: 10000,
      },
    },
  );

  // Initialize models
  Object.keys(modelsModules).forEach((module) => {
    const model = modelsModules[module](sequelize, Sequelize, connection);
    models[module] = model;
  });

  // Apply associations
  Object.keys(models).forEach((key) => {
    if ('associate' in models[key]) {
      models[key].associate(models);
    }
  });

  models.sequelize = sequelize;
  models.Sequelize = Sequelize;

  return models;
  
})(connection);

module.exports = models;
