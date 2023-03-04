// System library imports
const Sequelize = require("sequelize");

// Local imports
const connection = require("../database");

const User = connection.define("user", {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  admin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  alias: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  refreshToken: {
    type: Sequelize.STRING,
    defaultValue: "",
  },
  initialLogin: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  },
});

module.exports = User;
