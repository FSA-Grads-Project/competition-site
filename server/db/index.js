const connection = require('./database');

const User = require('./models/user');
const Test = require('./models/test');
const Result = require('./models/result');
const Problem = require('./models/problem');

Test.belongsTo(Problem);
Problem.hasMany(Test);

Result.belongsTo(User);
User.hasMany(Result);

Result.belongsTo(Problem);
Problem.hasMany(Result);

module.exports = {
  connection,
  models: {
    User,
    Test,
    Result,
    Problem
  }
};
