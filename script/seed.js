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

  await User.create({
    username: 'jimSmith',
    password: 'password1234',
    firstName: 'Jim',
    lastName: 'Smith',
    birthdate: '01/01/1970',
    country: 'US',
    email: 'jim.smith@mail.com'
  });
  
  await Promise.all(USERS.map(user => User.create(user)));

  const problem1 = await Problem.create({
    title: 'linked list',
    statement: 'Find the first null node in the linked list',
    initialCode: 'no starter code',
    startDate: '2022-09-01 00:00:00',
    endDate: '2022-10-01 00:00:00',
    spaceWeight: 0.44,
    timeWeight: 0.46
  });
 
  const problem2 = await Problem.create({
    title: 'nodes',
    statement: 'Find the first null node in ',
    initialCode: 'no starter code',
    startDate: '2022-10-01 00:00:00',
    endDate: '2022-11-01 00:00:00',
    spaceWeight: 0.44,
    timeWeight: 0.46
  });

  const problem3 = await Problem.create({
    title: 'linked list', 
    statement: 'Find the first null node in the linked list',
    initialCode: 'no starter code',
    startDate: '2022-11-01 00:00:00',
    endDate: '2022-12-01 00:00:00',
    spaceWeight: 0.44,
    timeWeight: 0.46
  });

  const problem4 = await Problem.create({
    title: 'Firefighters called to rescue cat from binary tree!',
    statement: `Local firefighters have been called to rescue a cat named
Sherman from a binary tree on 2nd street. Time is of the essence
as the firefighters need to travel across town and help another
department put out a four-alarm fire. Your goal is to help the
firefighters by developing a function that accepts the root
node of the binary tree as an argument and returns the number
of the node where Sherman the cat is located.`,
    initialCode: `function findSherman(root) {
  // write your code here
}`,
    hint1: `Sherman is a crazy cat that likes to climb the tallest outside
branches of the tree.`,
    startDate: '2022-12-01 00:00:00',
    endDate: '2023-01-01 00:00:00',
    spaceWeight: 0.75,
    timeWeight: 0.25
  });

  await Promise.all(RESULTS.map(res => Result.create(res)));

};

initialization();
