const Sequelize = require("sequelize");

const {
  connection,
  models: { User, Test, Result, Problem },
} = require("../server/db");
// const { RESULTS } = require("./seed-results");
// const { USERS } = require("./seed-users");

const initialization = async () => {
  await connection.sync({ force: true });

  // await Promise.all(USERS.map((user) => User.create(user)));

  const john = await User.create({
    email: "john.lennon@hotmail.com",
    alias: "john",
  });

  const bob = await User.create({
    email: "bob.hope@hotmail.com",
    alias: "bob",
  });

  const tim = await User.create({
    email: "tim.armstrong@hotmail.com",
    alias: "tim",
  });

  const joe = await User.create({
    email: "joe.schmoe@hotmail.com",
    alias: "joe",
  });

  const sam = await User.create({
    email: "sam.clemens@hotmail.com",
    alias: "sam",
  });

  const result1 = await Result.create({
    spaceUsed: 11290304,
    timeElapsed: 1437141724,
    startDatetime: "2022-11-01",
    completeDatetime: "2022-11-02",
  });

  const result2 = await Result.create({
    spaceUsed: 12743560,
    timeElapsed: 9358756,
    startDatetime: "2022-11-01",
    completeDatetime: "2022-11-04",
  });

  const result3 = await Result.create({
    spaceUsed: 12487664,
    timeElapsed: 4099683,
    startDatetime: "2022-11-01",
    completeDatetime: "2022-11-03",
  });

  const result4 = await Result.create({
    spaceUsed: 11290304,
    timeElapsed: 1437141724,
    startDatetime: "2022-12-01",
    completeDatetime: "2022-12-02",
  });

  const result5 = await Result.create({
    spaceUsed: 12743560,
    timeElapsed: 9358756,
    startDatetime: "2022-12-01",
    completeDatetime: "2022-12-04",
  });

  const result6 = await Result.create({
    spaceUsed: 12487664,
    timeElapsed: 4099683,
    startDatetime: "2022-12-01",
    completeDatetime: "2022-12-03",
  });

  const result7 = await Result.create({
    spaceUsed: 11290304,
    timeElapsed: 1437141724,
    startDatetime: "2023-01-01",
    completeDatetime: "2023-01-02",
  });

  const result8 = await Result.create({
    spaceUsed: 12743560,
    timeElapsed: 9358756,
    startDatetime: "2023-01-01",
    completeDatetime: "2023-01-04",
  });

  const result9 = await Result.create({
    spaceUsed: 12487664,
    timeElapsed: 4099683,
    startDatetime: "2023-01-01",
    completeDatetime: "2023-01-03",
  });

  const result10 = await Result.create({
    spaceUsed: 11290304,
    timeElapsed: 1437141724,
    startDatetime: "2023-02-01",
    completeDatetime: "2023-02-02",
  });

  const result11 = await Result.create({
    spaceUsed: 12743560,
    timeElapsed: 9358756,
    startDatetime: "2023-02-01",
    completeDatetime: "2023-02-04",
  });

  const result12 = await Result.create({
    spaceUsed: 12487664,
    timeElapsed: 4099683,
    startDatetime: "2023-02-01",
    completeDatetime: "2023-02-03",
  });

  const result13 = await Result.create({
    spaceUsed: 11290304,
    timeElapsed: 1437141724,
    startDatetime: "2023-02-01",
    completeDatetime: "2023-02-02",
  });

  const result14 = await Result.create({
    spaceUsed: 12487664,
    timeElapsed: 4099683,
    startDatetime: "2023-02-01",
    completeDatetime: "2023-02-03",
  });

  const problem1 = await Problem.create({
    title: "linked list",
    statement: "Find the first null node in the linked list",
    blurb: "Find the first null node in the linked list",
    initialCode: "no starter code",
    startDate: "2022-11-01 00:00:00",
    endDate: "2022-12-01 00:00:00",
    spaceWeight: 0.44,
    timeWeight: 0.46,
  });

  const problem2 = await Problem.create({
    title: "nodes",
    statement: "Find the first null node in ",
    blurb: "Find the first null node in ",
    initialCode: "no starter code",
    startDate: "2022-12-01 00:00:00",
    endDate: "2023-01-01 00:00:00",
    spaceWeight: 0.44,
    timeWeight: 0.46,
  });

  const problem3 = await Problem.create({
    title: "linked list",
    statement: "Find the first null node in the linked list",
    blurb: "Find the first null node in the linked list",
    initialCode: "no starter code",
    startDate: "2023-01-01 00:00:00",
    endDate: "2023-02-01 00:00:00",
    spaceWeight: 0.44,
    timeWeight: 0.46,
  });

  const problem4 = await Problem.create({
    title: "Firefighters called to rescue cat from binary tree!",
    statement: `Local firefighters have been called to rescue a cat named
Sherman from a binary tree on 2nd street. Time is of the essence
as the firefighters need to travel across town and help another
department put out a four-alarm fire. Your goal is to help the
firefighters by developing a function that accepts the root
node of the binary tree as an argument and returns the number
of the node where Sherman the cat is located.`,
    blurb: `Local firefighters have been called to rescue a cat named Sherman who's stuck in a tree. Log in for more details to see if you'll be able to help the firefighters get him down safely!`,
    initialCode: `function findSherman(root) {
  // write your code here
}

// example of the binary-tree class - do not edit
class binaryTree {
  constructor(number, sherman = false) {
    this.number = number;
    this.sherman = sherman;
    this.left = null;
    this.right = null; 
  }
}
runSubmission()
`,
    hint1: `Sherman is a crazy cat that likes to climb the tallest outside
branches of the tree.`,
    startDate: "2023-02-01 00:00:00",
    endDate: "2023-07-01 00:00:00",
    spaceWeight: 0.3,
    timeWeight: 0.6,
  });

  const test1 = await Test.create({
    test: `

class Node {
  constructor(number, sherman = false) {
    this.number = number;
    this.sherman = sherman;
    this.left = null;
    this.right = null; 
  }
}

class NodeQueue {
  constructor(value) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  enqueue(value) {
    this.length += 1;
    let newNode = new NodeQueue(value);

    if (this.tail) {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    } else {
      this.head = newNode;
      this.tail = newNode;
    }
  }
  dequeue() {
    if (this.head) {
      this.length -= 1;
      const dequeuedNode = this.head;
      this.head = this.head.next;

      if (this.head) {
        this.head.prev = null;
      } else {
        this.tail = null;
      }
      return dequeuedNode.value;
    }
    return undefined;
  }
}

function binaryTreeGenerator(N, nodeSherman) {
  let primaryQueue = new Queue(); 

  for (let i = 0; i < N; i++) {
    let node = new Node(i);
    if (i === nodeSherman - 1) node.sherman = true;
    primaryQueue.enqueue(node);
  }

  let secondaryQueue = new Queue();

  let root = primaryQueue.dequeue();
  secondaryQueue.enqueue(root);

  while (secondaryQueue.length > 0) {
    let p = secondaryQueue.dequeue();

    let pL = primaryQueue.dequeue();
    let pR = primaryQueue.dequeue();

    if (pL !== undefined) {
      secondaryQueue.enqueue(pL);
      p.left = pL;
    }
    if (pR !== undefined) {
      secondaryQueue.enqueue(pR);
      p.right = pR;
    }
  }
  return root;
}

function runSubmission() {

  const root = binaryTreeGenerator(50000, 50000);
  let start = process.hrtime.bigint();
  let result = findSherman(root);
  let end = process.hrtime.bigint();
  let resultTest = "";
  let resultMemory;
  let resultTime;

  if (result === 49999) {
    resultTest = 'test passed: sherman was at node 49999';
    resultMemory = process.memoryUsage().heapUsed;
    resultTime = end - start;
  } else {
    resultTest = 'test failed';
    resultMemory = 'None.'
    resultTime = 'None.'
  }

  return resultTest + ',' + 'resultTime: ' + resultTime + ',' + 'resultMemory: ' + resultMemory
}
`,
  });

  test1.problemId = problem4.id;
  await test1.save();

  result1.userId = john.id;
  result1.problemId = problem1.id;
  await result1.save();

  result2.userId = bob.id;
  result2.problemId = problem1.id;
  await result2.save();

  result3.userId = tim.id;
  result3.problemId = problem1.id;
  await result3.save();

  result4.userId = john.id;
  result4.problemId = problem2.id;
  await result4.save();

  result5.userId = bob.id;
  result5.problemId = problem2.id;
  await result5.save();

  result6.userId = tim.id;
  result6.problemId = problem2.id;
  await result6.save();

  result7.userId = john.id;
  result7.problemId = problem3.id;
  await result7.save();

  result8.userId = bob.id;
  result8.problemId = problem3.id;
  await result8.save();

  result9.userId = tim.id;
  result9.problemId = problem3.id;
  await result9.save();

  result10.userId = john.id;
  result10.problemId = problem4.id;
  await result10.save();

  result11.userId = bob.id;
  result11.problemId = problem4.id;
  await result11.save();

  result12.userId = tim.id;
  result12.problemId = problem4.id;
  await result12.save();

  result13.userId = joe.id;
  result13.problemId = problem4.id;
  await result13.save();

  result14.userId = sam.id;
  result14.problemId = problem4.id;
  await result14.save();

  // await Promise.all(RESULTS.map((res) => Result.create(res)));
};

initialization();
