const Sequelize = require("sequelize");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
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

const SALT_ROUNDS = 5;

// instance methods

User.prototype.validatePassword = function (inputPassword) {
  return bcrypt.compare(inputPassword, this.password);
};

User.prototype.generateToken = function () {
  // synchronous version of sign - no callback supplied
  return jwt.sign({ id: this.id }, process.env.JWT);
};

// class methods

User.authenticate = async function ({ username, password }) {
  const user = await this.findOne({
    where: { username: username },
  });
  if (!user || !(await user.validatePassword(password))) {
    const error = Error("incorrect username or password");
    error.status = 401;
    throw error;
  }
  return user.generateToken();
};

User.findByToken = async function (token) {
  try {
    // synchronous version of verify - no callback supplied
    const { id } = jwt.verify(token, process.env.JWT);
    const user = await User.findByPk(id);
    if (!user) {
      throw "user not found";
    }
    return user;
  } catch (ex) {
    const error = Error("invalid token");
    error.status = 401;
    throw error;
  }
};

// hooks for password hashing

const hashPassword = async (user) => {
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  }
};

User.beforeCreate(hashPassword);
User.beforeUpdate(hashPassword);
User.beforeBulkCreate((users) => Promise.all(users.map(hashPassword)));
