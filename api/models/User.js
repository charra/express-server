const bcrypt = require('bcrypt');

const tableName = 'user';

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('User', {
    userId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
    },
    phone: {
      type: Sequelize.STRING,
    },
  },
  { 
    tableName: tableName,
    syncOnAssociation: true
  });

  User.beforeCreate(user => {
    if(user.password) {
      user.password = bcrypt.hashSync(user.password, 10);
    }
  });

  User.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    delete values.password;
    return values;
  };

  User.associate = function(models) {
    models.User.hasMany(models.Schedule, { as: 'schedules', foreignKey: 'userId', allowNull: true });
  };

  return User;
};