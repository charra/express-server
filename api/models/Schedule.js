const Sequelize = require('sequelize');
const sequelize = require('../../config/database');
const User = require("./User");

const tableName = 'schedule';

const Schedule = sequelize.define('Schedule', {
  sheduleId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: Sequelize.STRING
  },
  peoples: {
    type: Sequelize.INTEGER
  },
  peoplesNow: {
    type: Sequelize.INTEGER
  },
  category: {
    type: Sequelize.STRING,
    enum: [""]
  },
  howMuch: {
    type: Sequelize.FLOAT
  },
  description: {
    type: Sequelize.STRING,
  },
  when: {
    type: Sequelize.BIGINT 
  },
  status: {
    type: Sequelize.ENUM,
    values: ["NEW", "PENDING", "CLOSED", "CANCELLED"]
  }
}, { 
  tableName: tableName,
  syncOnAssociation: true
 })
Schedule.owner = Schedule.belongsTo(User, { as: 'owner', through: 'user_schedule', foreignKey: 'sheduleId', allowNull: true });

module.exports = Schedule;