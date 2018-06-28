const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../../config/database');
const Schedule = require("./Schedule");

const tableName = 'user';

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
}, { 
  tableName: tableName,
  syncOnAssociation: true
});

//User.schedules = User.belongsTo(Schedule, { as: 'schedules', allowNull: true, });
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

module.exports = User;