const Sequelize = require('sequelize');
const connection = require('../database');

const Problem = connection.define('problem', {
  statement: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  solution: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  hint1: {
    type: Sequelize.TEXT
  },
  hint2: {
    type: Sequelize.TEXT
  },
  hint3: {
    type: Sequelize.TEXT
  },
  hint4: {
    type: Sequelize.TEXT
  },
  spaceWeight: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      isFloat: true
    }
  },
  timeWeight: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      isFloat: true
    }
  }
});

module.exports = Problem;
