const Sequelize = require("sequelize");
const connection = require("../database");

const Problem = connection.define("problem", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  statement: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  blurb: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  initialCode: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  hint: {
    type: Sequelize.TEXT,
  },
  startDate: {
    type: Sequelize.DATE,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  endDate: {
    type: Sequelize.DATE,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  spaceWeight: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      isFloat: true,
    },
  },
  timeWeight: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      isFloat: true,
    },
  },
  numberOfLinesForReadOnly: {
    type: Sequelize.INTEGER
  },
  current: {
    type: Sequelize.VIRTUAL,
    get() {
      const now = new Date().getTime();
      if (Date.parse(this.startDate) <= now && Date.parse(this.endDate) > now) {
        return true;
      } else {
        return false;
      }
    },
  },
});

module.exports = Problem;
