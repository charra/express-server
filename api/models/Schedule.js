const tableName = 'schedule';

module.exports = (sequelize, Sequelize) => {
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
      type: Sequelize.INTEGER,
      defaultValue : 0
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
      values: ["OPENED", "CLOSED", "CANCELLED"],
      defaultValue: "OPENED"
    }
  },
  { 
    tableName: tableName,
    syncOnAssociation: true
  });

  Schedule.associate = function(models) {
    models.Schedule.belongsTo(models.User, { as: 'owner', foreignKey: 'userId', allowNull: true });
    models.Schedule.belongsToMany(models.User, { as: 'workers', through: 'worker_schedules', foreignKey: 'scheduleId', allowNull: true });
  };

  return Schedule;
};