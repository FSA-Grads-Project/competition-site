
        const vm = require('vm');
        const process = require('process');
        try {
          const sandbox = {
            process: process,
          }
          vm.createContext(sandbox);
          let script = new vm.Script("\n\nclass Node {\n  constructor(number, sherman = false) {\n    this.number = number;\n    this.sherman = sherman;\n    this.left = null;\n    this.right = null; \n  }\n}\n\nclass NodeQueue {\n  constructor(value) {\n    this.value = value;\n    this.prev = null;\n    this.next = null;\n  }\n}\n\nclass Queue {\n  constructor() {\n    this.head = null;\n    this.tail = null;\n    this.length = 0;\n  }\n  enqueue(value) {\n    this.length += 1;\n    let newNode = new NodeQueue(value);\n\n    if (this.tail) {\n      this.tail.next = newNode;\n      newNode.prev = this.tail;\n      this.tail = newNode;\n    } else {\n      this.head = newNode;\n      this.tail = newNode;\n    }\n  }\n  dequeue() {\n    if (this.head) {\n      this.length -= 1;\n      const dequeuedNode = this.head;\n      this.head = this.head.next;\n\n      if (this.head) {\n        this.head.prev = null;\n      } else {\n        this.tail = null;\n      }\n      return dequeuedNode.value;\n    }\n    return undefined;\n  }\n}\n\nfunction binaryTreeGenerator(N, nodeSherman) {\n  let primaryQueue = new Queue(); \n\n  for (let i = 0; i < N; i++) {\n    let node = new Node(i);\n    if (i === nodeSherman - 1) node.sherman = true;\n    primaryQueue.enqueue(node);\n  }\n\n  let secondaryQueue = new Queue();\n\n  let root = primaryQueue.dequeue();\n  secondaryQueue.enqueue(root);\n\n  while (secondaryQueue.length > 0) {\n    let p = secondaryQueue.dequeue();\n\n    let pL = primaryQueue.dequeue();\n    let pR = primaryQueue.dequeue();\n\n    if (pL !== undefined) {\n      secondaryQueue.enqueue(pL);\n      p.left = pL;\n    }\n    if (pR !== undefined) {\n      secondaryQueue.enqueue(pR);\n      p.right = pR;\n    }\n  }\n  return root;\n}\n\nfunction runSubmission() {\n\n  const root = binaryTreeGenerator(50000, 50000);\n  let start = process.hrtime.bigint();\n  let result = findSherman(root);\n  let end = process.hrtime.bigint();\n  let resultTest = \"\";\n  let resultMemory;\n  let resultTime;\n\n  if (result === 49999) {\n    resultTest = 'test passed: sherman was at node 49999';\n    resultMemory = process.memoryUsage().heapUsed;\n    resultTime = end - start;\n  } else {\n    resultTest = 'test failed';\n    resultMemory = 'None.'\n    resultTime = 'None.'\n  }\n\n  return resultTest + ',' + 'resultTime: ' + resultTime + ',' + 'resultMemory: ' + resultMemory\n}\nfunction findSherman(root) {\n  // write your code here\n}\n\n// example of the binary-tree class - do not edit\nclass binaryTree {\n  constructor(number, sherman = false) {\n    this.number = number;\n    this.sherman = sherman;\n    this.left = null;\n    this.right = null; \n  }\n}\nrunSubmission()\n");
          const contextOutput = script.runInContext(sandbox, {
            console: console,
          });
          let consoleScript = new vm.Script(eval("\n\nclass Node {\n  constructor(number, sherman = false) {\n    this.number = number;\n    this.sherman = sherman;\n    this.left = null;\n    this.right = null; \n  }\n}\n\nclass NodeQueue {\n  constructor(value) {\n    this.value = value;\n    this.prev = null;\n    this.next = null;\n  }\n}\n\nclass Queue {\n  constructor() {\n    this.head = null;\n    this.tail = null;\n    this.length = 0;\n  }\n  enqueue(value) {\n    this.length += 1;\n    let newNode = new NodeQueue(value);\n\n    if (this.tail) {\n      this.tail.next = newNode;\n      newNode.prev = this.tail;\n      this.tail = newNode;\n    } else {\n      this.head = newNode;\n      this.tail = newNode;\n    }\n  }\n  dequeue() {\n    if (this.head) {\n      this.length -= 1;\n      const dequeuedNode = this.head;\n      this.head = this.head.next;\n\n      if (this.head) {\n        this.head.prev = null;\n      } else {\n        this.tail = null;\n      }\n      return dequeuedNode.value;\n    }\n    return undefined;\n  }\n}\n\nfunction binaryTreeGenerator(N, nodeSherman) {\n  let primaryQueue = new Queue(); \n\n  for (let i = 0; i < N; i++) {\n    let node = new Node(i);\n    if (i === nodeSherman - 1) node.sherman = true;\n    primaryQueue.enqueue(node);\n  }\n\n  let secondaryQueue = new Queue();\n\n  let root = primaryQueue.dequeue();\n  secondaryQueue.enqueue(root);\n\n  while (secondaryQueue.length > 0) {\n    let p = secondaryQueue.dequeue();\n\n    let pL = primaryQueue.dequeue();\n    let pR = primaryQueue.dequeue();\n\n    if (pL !== undefined) {\n      secondaryQueue.enqueue(pL);\n      p.left = pL;\n    }\n    if (pR !== undefined) {\n      secondaryQueue.enqueue(pR);\n      p.right = pR;\n    }\n  }\n  return root;\n}\n\nfunction runSubmission() {\n\n  const root = binaryTreeGenerator(50000, 50000);\n  let start = process.hrtime.bigint();\n  let result = findSherman(root);\n  let end = process.hrtime.bigint();\n  let resultTest = \"\";\n  let resultMemory;\n  let resultTime;\n\n  if (result === 49999) {\n    resultTest = 'test passed: sherman was at node 49999';\n    resultMemory = process.memoryUsage().heapUsed;\n    resultTime = end - start;\n  } else {\n    resultTest = 'test failed';\n    resultMemory = 'None.'\n    resultTime = 'None.'\n  }\n\n  //return resultTest + ',' + 'resultTime: ' + resultTime + ',' + 'resultMemory: ' + resultMemory\n}\nfunction findSherman(root) {\n  // write your code here\n}\n\n// example of the binary-tree class - do not edit\nclass binaryTree {\n  constructor(number, sherman = false) {\n    this.number = number;\n    this.sherman = sherman;\n    this.left = null;\n    this.right = null; \n  }\n}\nrunSubmission()\n"));
          console.log(contextOutput)
        } catch(err) {
        console.log(err)
        }
        