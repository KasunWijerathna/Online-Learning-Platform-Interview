const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Course = require('./Course');

const Enrollment = sequelize.define('Enrollment', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER, references: { model: User, key: 'id' } },
  courseId: { type: DataTypes.INTEGER, references: { model: Course, key: 'id' } }
});

module.exports = Enrollment;
