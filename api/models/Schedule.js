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
  },
  { 
    tableName: tableName,
    syncOnAssociation: true
  });

  Schedule.associate = function(models) {
    models.Schedule.belongsTo(models.User, { as: 'owner', foreignKey: 'userId', allowNull: true });
  };

  return Schedule;
};