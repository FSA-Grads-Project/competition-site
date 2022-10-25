const connection = require('./database');

const User = require('./models/user');
const Result = require('./models/result');
const Problem = require('./models/problem');

Result.belongsTo(User);
User.hasMany(Result);

Result.belongsTo(Problem);
Problem.hasMany(Result);

module.exports = {
  connection,
  models: {
    User,
    Result,
    Problem
  }
};
