const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const tableName = 'schedule';

const Schedule = sequelize.define('Schedule', {
  scheduleId: {
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
}, { tableName: tableName});

Schedule.associate = function(models) {
  Schedule.belongsToMany(User, { as: 'contractors', through: 'worker_tasks', foreignKey: 'scheduleId' });
};

module.exports = Schedule;