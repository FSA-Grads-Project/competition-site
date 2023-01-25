const Sequelize = require("sequelize");

const {
  connection,
  models: { User, Test, Result, Problem },
} = require("../server/db");
const { RESULTS } = require("./seed-results");
const { USERS } = require("./seed-users");

const initialization = async () => {
  await connection.sync({ force: true });

  await Promise.all(USERS.map((user) => User.create(user)));

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
    title: "linked list",
    statement: "Find the first null node in the linked list",
    blurb: "Find the first null node in the linked list",
    initialCode: "no starter code",
    startDate: "2022-10-01 00:00:00",
    endDate: "2022-11-01 00:00:00",
    spaceWeight: 0.44,
    timeWeight: 0.46,
  });

  const problem2 = await Problem.create({
    title: "nodes",
    statement: "Find the first null node in ",
    blurb: "Find the first null node in ",
    initialCode: "no starter code",
    startDate: "2022-11-01 00:00:00",
    endDate: "2022-12-01 00:00:00",
    spaceWeight: 0.44,
    timeWeight: 0.46,
  });

  const problem3 = await Problem.create({
    title: "linked list",
    statement: "Find the first null node in the linked list",
    blurb: "Find the first null node in the linked list",
    initialCode: "no starter code",
    startDate: "2022-12-01 00:00:00",
    endDate: "2023-01-01 00:00:00",
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
    startDate: "2023-01-01 00:00:00",
    endDate: "2023-01-31 00:00:00",
    spaceWeight: 0.75,
    timeWeight: 0.25,
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

  await Promise.all(RESULTS.map((res) => Result.create(res)));
};

initialization();
