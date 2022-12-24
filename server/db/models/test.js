const Sequelize = require('sequelize');
const connection = require('../database');

const Test = connection.define('test', {
  test: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
});

module.exports = Test;
