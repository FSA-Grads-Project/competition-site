const Sequelize = require("sequelize");
const connection = require("../database");

const Result = connection.define("result", {
  spaceUsed: {
    type: Sequelize.FLOAT,
  },
  timeElapsed: {
    type: Sequelize.FLOAT,
  },
  startDatetime: {
    type: Sequelize.DATE,
  },
  completeDatetime: {
    type: Sequelize.DATE,
  },
  solutionCode: {
    type: Sequelize.TEXT,
  },
});

module.exports = Result;
