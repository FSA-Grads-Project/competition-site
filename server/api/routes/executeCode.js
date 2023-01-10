const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;

function executeCode (code, problem, res) {
  // create random filename
  let fileName = uuidv4() + '.js';
  
  // create filepath in temp folder utilizing random filename 
  let filePath = path.join(__dirname, `/temp/${fileName}`);

	// create problem code to be used for consoleScript
	const consoleProblem = problem.replace('return resultTest', '//return resultTest')
  
  // create script to pass to docker container that contains code execution process to capture test output + console output
  const runCode = `
        const vm = require('vm');
        const process = require('process');
        try {
          const sandbox = {
            process: process,
          }
          vm.createContext(sandbox);
          let script = new vm.Script(${JSON.stringify(problem + code)});
          const contextOutput = script.runInContext(sandbox, {
            console: console,
          });
          let consoleScript = new vm.Script(eval(${JSON.stringify(consoleProblem + code)}));
          console.log(contextOutput)
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
          exec(`docker run --rm -v ${filePath}:/runtest node:18.7.0 /bin/bash -c 'node runtest'`, 
            (error, stdout, stderr) => {
          if (error) {
              console.log(`error: ${error.message}`);
              fs.unlinkSync(filePath)
              return;
          }
          if (stderr) {
              console.log(`stderr: ${stderr}`);
              fs.unlinkSync(filePath)
              return;
          }

          // prepare test results + consoles for front end
          stdout = stdout.split('\n')
          stdout = stdout.filter(Boolean)
          let results = {contextOutput: stdout[stdout.length - 1]}
          stdout.pop();
          results.consoleOutput = stdout
          console.log(results)
          fs.unlinkSync(filePath)
          res.json(results)
        });
      }
    });

  } catch(er){
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
    }
    res.json(er)
    console.log(er)
    next(er)
    
  }


}

module.exports = executeCode