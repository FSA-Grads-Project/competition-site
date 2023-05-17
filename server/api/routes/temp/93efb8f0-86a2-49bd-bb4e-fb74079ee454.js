
        const {VM, VMScript} = require('vm2');
        const process = require('process');

        const vm = new VM({
          sandbox: {
            timeout: 10000,
            process: process
          }
        });
        try {
          const contextScript = new VMScript("\nclass Node {\n  constructor(number, sherman = false) {\n    this.number = number;\n    this.sherman = sherman;\n    this.left = null;\n    this.right = null; \n  }\n}\nclass NodeQueue {\n  constructor(value) {\n    this.value = value;\n    this.prev = null;\n    this.next = null;\n  }\n}\nclass Queue {\n  constructor() {\n    this.head = null;\n    this.tail = null;\n    this.length = 0;\n  }\n  enqueue(value) {\n    this.length += 1;\n    let newNode = new NodeQueue(value);\n    if (this.tail) {\n      this.tail.next = newNode;\n      newNode.prev = this.tail;\n      this.tail = newNode;\n    } else {\n      this.head = newNode;\n      this.tail = newNode;\n    }\n  }\n  dequeue() {\n    if (this.head) {\n      this.length -= 1;\n      const dequeuedNode = this.head;\n      this.head = this.head.next;\n      if (this.head) {\n        this.head.prev = null;\n      } else {\n        this.tail = null;\n      }\n      return dequeuedNode.value;\n    }\n    return undefined;\n  }\n}\nfunction binaryTreeGenerator(N, nodeSherman) {\n  let primaryQueue = new Queue(); \n  for (let i = 0; i < N; i++) {\n    let node = new Node(i);\n    if (i === nodeSherman - 1) node.sherman = true;\n    primaryQueue.enqueue(node);\n  }\n  let secondaryQueue = new Queue();\n  let root = primaryQueue.dequeue();\n  secondaryQueue.enqueue(root);\n  while (secondaryQueue.length > 0) {\n    let p = secondaryQueue.dequeue();\n    let pL = primaryQueue.dequeue();\n    let pR = primaryQueue.dequeue();\n    if (pL !== undefined) {\n      secondaryQueue.enqueue(pL);\n      p.left = pL;\n    }\n    if (pR !== undefined) {\n      secondaryQueue.enqueue(pR);\n      p.right = pR;\n    }\n  }\n  return root;\n}\n\nfunction test(size, location, testNumber) {\n  const root = binaryTreeGenerator(size, location);\n  console.log(' - test number: - ' + testNumber)\n  const start = process.hrtime.bigint();\n  const result = findSherman(root);\n  const end = process.hrtime.bigint();\n\n  const time = end - start;\n  const memory = process.memoryUsage().heapUsed;\n\n  return { result: result, time: time, memory: memory };\n}\n\nfunction separateResults(results) {\n  const resultTest = [];\n  const resultTime = [];\n  const resultMemory = [];\n\n  for (let i = 0; i < results.length; i++) {\n    resultTest.push(results[i].result);\n    resultTime.push(results[i].time);\n    resultMemory.push(results[i].memory);\n  }\n\n  return { result: resultTest, time: resultTime, memory: resultMemory };\n}\n\nfunction runSubmission() {\n\n  let results = [];\n\n  const results1 = test(10000, 10000, 1);\n  const results2 = test(20000, 20000, 2);\n  const results3 = test(30000, 30000, 3);\n\n  results.push(results1);\n  results.push(results2);\n  results.push(results3);\n\n  results = separateResults(results);\n\n  let resultTest = results.result;\n  let resultTime = results.time.reduce((acc, cur) => { return acc + Number(cur); }, 0) / results.time.length;\n  let resultMemory = results.memory.reduce((acc, cur) => { return acc + cur; }, 0) / results.memory.length;\n\n  resultTime = resultTime.toFixed(0);\n  resultMemory = resultMemory.toFixed(0);\n\n  if (resultTest[0] === 9999 && resultTest[1] === 19999 && resultTest[2] === 29999) {\n    resultTest = 'tests passed';\n  } else {\n    resultTest = 'test failed';\n    resultMemory = 'none';\n    resultTime = 'none';\n  }\n\n  return resultTest + ',' + 'resultTime: ' + resultTime + ',' + 'resultMemory: ' + resultMemory;\n}\nfunction findSherman(root) {}\n// write your code here\n\n// example of the binary-tree class\nclass binaryTree {\n  constructor(number, sherman = false) {\n    this.number = number;\n    this.sherman = sherman;\n    this.left = null;\n    this.right = null;\n  }\n}\nrunSubmission();")
          const consoleScript = new VMScript(eval("\nclass Node {\n  constructor(number, sherman = false) {\n    this.number = number;\n    this.sherman = sherman;\n    this.left = null;\n    this.right = null; \n  }\n}\nclass NodeQueue {\n  constructor(value) {\n    this.value = value;\n    this.prev = null;\n    this.next = null;\n  }\n}\nclass Queue {\n  constructor() {\n    this.head = null;\n    this.tail = null;\n    this.length = 0;\n  }\n  enqueue(value) {\n    this.length += 1;\n    let newNode = new NodeQueue(value);\n    if (this.tail) {\n      this.tail.next = newNode;\n      newNode.prev = this.tail;\n      this.tail = newNode;\n    } else {\n      this.head = newNode;\n      this.tail = newNode;\n    }\n  }\n  dequeue() {\n    if (this.head) {\n      this.length -= 1;\n      const dequeuedNode = this.head;\n      this.head = this.head.next;\n      if (this.head) {\n        this.head.prev = null;\n      } else {\n        this.tail = null;\n      }\n      return dequeuedNode.value;\n    }\n    return undefined;\n  }\n}\nfunction binaryTreeGenerator(N, nodeSherman) {\n  let primaryQueue = new Queue(); \n  for (let i = 0; i < N; i++) {\n    let node = new Node(i);\n    if (i === nodeSherman - 1) node.sherman = true;\n    primaryQueue.enqueue(node);\n  }\n  let secondaryQueue = new Queue();\n  let root = primaryQueue.dequeue();\n  secondaryQueue.enqueue(root);\n  while (secondaryQueue.length > 0) {\n    let p = secondaryQueue.dequeue();\n    let pL = primaryQueue.dequeue();\n    let pR = primaryQueue.dequeue();\n    if (pL !== undefined) {\n      secondaryQueue.enqueue(pL);\n      p.left = pL;\n    }\n    if (pR !== undefined) {\n      secondaryQueue.enqueue(pR);\n      p.right = pR;\n    }\n  }\n  return root;\n}\n\nfunction test(size, location, testNumber) {\n  const root = binaryTreeGenerator(size, location);\n  console.log(' - test number: - ' + testNumber)\n  const start = process.hrtime.bigint();\n  const result = findSherman(root);\n  const end = process.hrtime.bigint();\n\n  const time = end - start;\n  const memory = process.memoryUsage().heapUsed;\n\n  return { result: result, time: time, memory: memory };\n}\n\nfunction separateResults(results) {\n  const resultTest = [];\n  const resultTime = [];\n  const resultMemory = [];\n\n  for (let i = 0; i < results.length; i++) {\n    resultTest.push(results[i].result);\n    resultTime.push(results[i].time);\n    resultMemory.push(results[i].memory);\n  }\n\n  return { result: resultTest, time: resultTime, memory: resultMemory };\n}\n\nfunction runSubmission() {\n\n  let results = [];\n\n  const results1 = test(10000, 10000, 1);\n  const results2 = test(20000, 20000, 2);\n  const results3 = test(30000, 30000, 3);\n\n  results.push(results1);\n  results.push(results2);\n  results.push(results3);\n\n  results = separateResults(results);\n\n  let resultTest = results.result;\n  let resultTime = results.time.reduce((acc, cur) => { return acc + Number(cur); }, 0) / results.time.length;\n  let resultMemory = results.memory.reduce((acc, cur) => { return acc + cur; }, 0) / results.memory.length;\n\n  resultTime = resultTime.toFixed(0);\n  resultMemory = resultMemory.toFixed(0);\n\n  if (resultTest[0] === 9999 && resultTest[1] === 19999 && resultTest[2] === 29999) {\n    resultTest = 'tests passed';\n  } else {\n    resultTest = 'test failed';\n    resultMemory = 'none';\n    resultTime = 'none';\n  }\n\n  //return resultTest + ',' + 'resultTime: ' + resultTime + ',' + 'resultMemory: ' + resultMemory;\n}\nfunction findSherman(root) {}\n// write your code here\n\n// example of the binary-tree class\nclass binaryTree {\n  constructor(number, sherman = false) {\n    this.number = number;\n    this.sherman = sherman;\n    this.left = null;\n    this.right = null;\n  }\n}\nrunSubmission();"));
          console.log(vm.run(contextScript))
        } catch(err) {
          console.log(err)
        }
      