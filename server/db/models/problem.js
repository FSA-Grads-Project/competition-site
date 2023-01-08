const Sequelize = require('sequelize');
const connection = require('../database');

const Problem = connection.define('problem', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  statement: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  initialCode: {
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
  startDate: {
    type: Sequelize.DATE,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  endDate: {
    type: Sequelize.DATE,
    allowNull: false,
    validate: {
      notEmpty: true
    }
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
