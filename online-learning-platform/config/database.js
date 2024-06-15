const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('online_platform', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
