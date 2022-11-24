const Sequelize = require('sequelize');


const { 
  connection, 
  models: { 
    User, 
    Result, 
    Problem
  }
} = require('../server/db');
const { RESULTS } = require('./seed-results');
const { USERS } = require('./seed-users');


const initialization = async () => {

  await connection.sync({ force: true });
  
  await Promise.all(USERS.map(user => User.create(user)));
 


  // const result1 = await Result.create({
  //   spaceUsed: 8,
  //   timeElapsed: 100,
  //   startDatetime: '2022-10-20',
  //   completeDatetime: '2022-10-21'
  // });

  // const result2 = await Result.create({
  //   spaceUsed: 6,
  //   timeElapsed: 97,
  //   startDatetime: '2022-10-23',
  //   completeDatetime: '2022-10-24'
  // });



  const problem1 = await Problem.create({
    statement: 'Find the height of a binary tree',
    solution: 'long string of code...',
    spaceWeight: 0.33,
    timeWeight: 0.33
  });

  const problem2 = await Problem.create({
    statement: 'Find the first null node in the linked list',
    solution: 'long string of code...',
    spaceWeight: 0.44,
    timeWeight: 0.46
  });


  const problem3 = await Problem.create({
    statement: 'Find the first null node in ',
    solution: 'long string of code...',
    spaceWeight: 0.44,
    timeWeight: 0.46
  });


  const problem4 = await Problem.create({
    statement: 'Find the first null node in the linked list',
    solution: 'long string of code...',
    spaceWeight: 0.44,
    timeWeight: 0.46
  });

 
  await Promise.all(RESULTS.map(res => Result.create(res)));

  // result1.userId = user1.id;
  // result1.problemId = problem1.id;

  // await result1.save();

};

initialization();
