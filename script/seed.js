const Sequelize = require('sequelize');
const { 
  connection, 
  models: { 
    User, 
    Result, 
    Problem
  }
} = require('../server/db');

const initialization = async () => {

  await connection.sync({ force: true });

  const user1 = await User.create({
    username: 'jimSmith',
    password: 'password1234',
    firstName: 'Jim',
    lastName: 'Smith',
    country: 'US',
    email: 'jim.smith@mail.com'
  });

  const result1 = await Result.create({
    spaceUsed: 8,
    timeElapsed: 100,
    startDatetime: '2022-10-20',
    completeDatetime: '2022-10-21'
  });

  const problem1 = await Problem.create({
    statement: 'Find the height of a binary tree',
    solution: 'long string of code...',
    spaceWeight: 0.33,
    timeWeight: 0.33
  });

  result1.userId = user1.id;
  result1.problemId = problem1.id;

  await result1.save();

};

initialization();
