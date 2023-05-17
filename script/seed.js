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
    title: "A Community Center for Graph Theory Enthusiasts",
    statement: "Find the first null node in ",
    blurb:
      "In the heart of Silicon Valley, there stood a store called 'Null Node Nook.' The store was a programmer's paradise, filled with all sorts of resources and tools for solving complex programming problems. But its main attraction was the 'Null Node Lounge' - a cozy corner in the store where customers could gather and work together to solve one of the most challenging problems in graph theory: finding a null node.",
    initialCode: "no starter code",
    startDate: "2022-12-01 00:00:00",
    endDate: "2023-01-01 00:00:00",
    spaceWeight: 0.44,
    timeWeight: 0.46,
  });

  const problem3 = await Problem.create({
    title: "A Programmer's Paradise for Linked List Lovers",
    statement: "Find the first null node in the linked list",
    blurb:
      "In the bustling city of Techville, there was a store that stood out from the rest - 'The Linked List Emporium.' The store was a programmer's paradise, filled to the brim with resources and tools for solving all sorts of programming problems. But its specialty was linked lists. The owner, a brilliant programmer named Max, had a particular passion for linked lists and had spent years perfecting his craft. His store was not just a place to buy programming resources - it was a community center where people from all walks of life could gather and share their love for linked lists.",
    initialCode: "no starter code",
    startDate: "2023-01-01 00:00:00",
    endDate: "2023-02-01 00:00:00",
    spaceWeight: 0.44,
    timeWeight: 0.46,
  });

  const problem4 = await Problem.create({
    title: "Firefighters called to rescue cat from binary tree!",
    statement: `Local firefighters have been called to rescue a cat named Sherman who has become stuck in a binary tree on 2nd street. Despite their best efforts, the firefighters are struggling to locate the cat and are in urgent need of the community's assistance in finding the feline's location within the tree.

		Time is of the essence as the firefighters are also needed across town to assist with a four-alarm fire. The community is being asked to help by keeping an eye out for Sherman in the tree and reporting any sightings or clues to the firefighters on the scene.
		
		The rescue mission is ongoing, and the firefighters are grateful for any assistance the community can provide. They urge everyone to stay safe and report any sightings of the cat as soon as possible, so they can quickly retrieve the feline and rush off to assist with the urgent fire. Your goal is to help the firefighters by developing a function that accepts the root node of the binary tree as an argument and returns the number of the node where Sherman the cat is located.`,
    blurb: `Local firefighters have received an urgent call to rescue Sherman, a cat stuck in a tree on 2nd Street downtown. The situation was made more complicated by the fact that the firefighters were already stretched thin, trying to help another department put out a four-alarm fire. With every second counting, and the firefighters needed to move quickly to rescue Sherman before they could head out to the other emergency.`,
    initialCode: `function findSherman(root) {
  // write your code here
}
// example of the binary-tree class
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
    numberOfLinesForReadOnly: 10,
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

function test(size, location, testNumber) {
  const root = binaryTreeGenerator(size, location);

  console.log(' --------- TEST NUMBER  ' + testNumber + ' ---------')

  const start = process.hrtime.bigint();
  const result = findSherman(root);
  const end = process.hrtime.bigint();

  const time = end - start;
  const memory = process.memoryUsage().heapUsed;

  return { result: result, time: time, memory: memory };
}

function separateResults(results) {
  const resultTest = [];
  const Time = [];
  const Memory = [];

  for (let i = 0; i < results.length; i++) {
    resultTest.push(results[i].result);
    Time.push(results[i].time);
    Memory.push(results[i].memory);
  }

  return { result: resultTest, time: Time, memory: Memory };
}

function runSubmission() {

  let results = [];

  const results1 = test(10000, 10000, 1);
  const results2 = test(20000, 20000, 2);
  const results3 = test(30000, 30000, 3);

  results.push(results1);
  results.push(results2);
  results.push(results3);

  results = separateResults(results);

  let resultTest = results.result;
  let Time = results.time.reduce((acc, cur) => { return acc + Number(cur); }, 0) / results.time.length;
  let Memory = results.memory.reduce((acc, cur) => { return acc + cur; }, 0) / results.memory.length;

  Time = Time.toFixed(0);
  Memory = Memory.toFixed(0);

  if (resultTest[0] === 9999 && resultTest[1] === 19999 && resultTest[2] === 29999) {
    resultTest = 'tests passed';
  } else {
    resultTest = 'test failed';
    Memory = 'none';
    Time = 'none';
  }

  return resultTest + ',' + 'Time: ' + Time + ',' + 'Memory: ' + Memory;
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
