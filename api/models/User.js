const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../../config/database');

const tableName = 'user';

const User = sequelize.define('User', {
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
}, "", { tableName: tableName });

User.associate = function (models) {
  User.belongsTo(models.Schedule, { as: 'owner', foreignKey: { name: 'courseId', allowNull: false } });
  User.belongsToMany(models.Schedule, { as: 'schedules', through: 'worker_tasks', foreignKey: 'userId' })
};
User.beforeCreate(user => {
  user.password = bcrypt.hashSync(user.password, 10);
});

User.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  delete values.password;
  return values;
};

module.exports = User;