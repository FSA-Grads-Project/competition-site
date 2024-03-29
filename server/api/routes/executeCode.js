const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;

const babel = require('babel-core');
const loopcontrol = require('./loopcontrol');
const os = require('os');

function executeCode(code, problem, res) {
  // create random filename
  let fileName = uuidv4() + '.js';

  // create problem code to be used for consoleScript
  const consoleProblem = problem.replace(
    'return resultTest',
    '//return resultTest'
  );
  // convert from a buffer to a string for babel transform
  const src = code.toString();

  try {
    // use plugin to transform the source
    const out = babel.transform(src, {
      plugins: [loopcontrol],
    });
    code = out.code;
  } catch (er) {
    console.log(er);
  }

  // create script to pass to docker container that contains code execution process to capture test output + console output
  const runCode = `
        const {VM, VMScript} = require('vm2');
        const process = require('process');

        const vm = new VM({
          sandbox: {
            timeout: 10000,
            process: process
          }
        });
        try {
          const contextScript = new VMScript(${JSON.stringify(problem + code)})
          const consoleScript = new VMScript(eval(${JSON.stringify(
            consoleProblem + code
          )}));
          console.log(vm.run(contextScript))
        } catch(err) {
          console.log(err)
        }
      `;

  // let platform = os.cpus()[0].model.includes('Intel')
  //   ? 'linux/arm64/v8'
  //   : 'linux/amd64';

  let platform = 'linux/amd64'

  try {
    let filePath = path.join(__dirname, `/temp/${fileName}`);

    // create new temp file containing user code
    fs.writeFile(filePath, runCode, (err) => {
      if (err) console.log(err);
      else {
        console.log('\nFile written successfully\n');
        // create/destroy docker container for code execution process
        exec(
          `docker run  --platform ${platform} --rm -v ${filePath}:/app/runtest alexanderstoisolovich/nodevm2test:dockerimg /bin/bash -c 'node runtest'`,
          (error, stdout, stderr) => {
            if (error) {
              console.log(`error: ${error.message}`);
              fs.unlinkSync(filePath);
              console.log('\nFile removed successfully\n');
              return;
            }
            if (stderr) {
              console.log(`stderr: ${stderr}`);
              fs.unlinkSync(filePath);
              console.log('\nFile removed successfully\n');
              return;
            }

            // prepare test results + consoles for front end
            if (!stdout) {
              stdout = 'test failed,Time: None.,Memory: None.';
            }

            stdout = stdout.split('\n');
            stdout = stdout.filter(Boolean);

            if (
              !stdout[stdout.length - 1].includes('test failed') &&
              !stdout[stdout.length - 1].includes('tests passed')
            ) {
              stdout.push('test failed,Time: None.,Memory: None.');
            }

            let results = {
              contextOutput: stdout[stdout.length - 1].split(','),
            };

            stdout.pop();
            results.consoleOutput = stdout;
            console.log(results);
            fs.unlinkSync(filePath);
            console.log('\nFile removed successfully\n');
            res.json(results);
          }
        );
      }
    });
  } catch (er) {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log('\nFile removed successfully\n');
    }
    res.json(er);
    console.log(er);
    next(er);
  }
}

module.exports = executeCode;
