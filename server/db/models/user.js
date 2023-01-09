// System library imports
const Sequelize = require("sequelize");

// Local imports
const connection = require("../database");

const User = connection.define("user", {
  providerId: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  provider: {
    type: Sequelize.ENUM("GOOGLE", "GITHUB", "LINKEDIN"),
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
});

module.exports = User;
