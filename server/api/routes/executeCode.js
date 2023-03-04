const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;
const babel = require("babel-core");
const loopcontrol = require("./loopcontrol");

function executeCode (code, problem, res) {
  // create random filename
  let fileName = uuidv4() + '.js';
  
  // create filepath in temp folder utilizing random filename 
  let filePath = path.join(__dirname, `/temp/${fileName}`);


	// create problem code to be used for consoleScript
	const consoleProblem = problem.replace('return resultTest', '//return resultTest');
  // convert from a buffer to a string for babel transform
  const src = code.toString();
  
  try {
  // use plugin to transform the source
    const out = babel.transform(src, {
      plugins: [loopcontrol] 
    });
    code = out.code; 
  } catch(er) {
      console.log(er)
  }

  // Old code execution process using node vm
  // const runCode = `
  //       const vm = require('vm');
  //       const process = require('process');
  //       try {
  //         const sandbox = {
  //           process: process,
  //         }
  //         vm.createContext(sandbox);
  //         let script = new vm.Script(${JSON.stringify(problem + code)});
  //         const contextOutput = script.runInContext(sandbox, {
  //           console: console,
  //         });
  //         let consoleScript = new vm.Script(eval(${JSON.stringify(consoleProblem + code)}));
  //         console.log(contextOutput)
  //       } catch(err) {
  //       console.log(err)
  //       }`
 
  // create script to pass to docker container that contains code execution process to capture test output + console output
  const runCode = `
        const {VM, VMScript} = require('vm2');
        const process = require('process');
        const vm = new VM({
          timeout: 1000,
          sandbox: {
            process: process
          }
        });
        try {
          const contextScript = new VMScript(${JSON.stringify(problem + code)}).compile();
          const consoleScript = new VMScript(eval(${JSON.stringify(consoleProblem + code)}));
          console.log(vm.run(contextScript));
        } catch(err) {
          console.log(err)
        }
      `

  try {
    // create new temp file containing user code
        fs.writeFile(filePath, runCode, (err) => {  
          if (err)
          console.log(err);
          else {
          console.log("File written successfully\n");
          // create/destroy docker container for code execution process
          exec(`docker run --rm -v ${filePath}:/app/runtest frai26/dispatch:nodevm2 /bin/bash -c 'node runtest'`, 
            (error, stdout, stderr) => {
          if (error) {
              console.log(`error: ${error.message}`);
              fs.unlinkSync(filePath)
              console.log("File removed successfully\n");
              return;
          }
          if (stderr) {
              console.log(`stderr: ${stderr}`);
              fs.unlinkSync(filePath)
              console.log("File removed successfully\n");
              return;
          }

          // prepare test results + consoles for front end
          console.log(stdout)
          if (!stdout) {
            stdout = "test failed,resultTime: None.,resultMemory: None."
          }

          stdout = stdout.split('\n')
          stdout = stdout.filter(Boolean)
          let results = {contextOutput: stdout[stdout.length - 1].split(",")};
          stdout.pop();
          results.consoleOutput = stdout
          console.log(results)
          fs.unlinkSync(filePath)
          console.log("File removed successfully\n");
          res.json(results)
        });
      }
    });

  } catch(er){
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
      console.log("File removed successfully\n");
    }
    res.json(er)
    console.log(er)
    next(er)
  }
}

module.exports = executeCode