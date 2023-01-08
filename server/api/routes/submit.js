const express = require('express');
const fs = require('fs');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const exec = require('child_process').exec;
const { models: { Test } } = require('../../db');

router.post('/:id', async (req, res, next) => {
  // code is user code
  let code = req.body.code

  // create random filename
  let fileName = uuidv4() + '.js';

  // create filepath in temp folder utilizing random filename 
  let filePath = path.join(__dirname, `/temp/${fileName}`);

      try {

        let response = await Test.findOne({
          where: { problemId: req.params.id }
        });

        let problem = response.dataValues.test;

        // create script to pass to docker container that contains code execution process
        const runCode = `
        const vm = require('vm');
        try {
          const sandbox = {}
          vm.createContext(sandbox);
          let script = new vm.Script(${JSON.stringify(code + problem)});
          const contextOutput = script.runInContext(sandbox, {
            console: console,
          });
          let consoleScript = new vm.Script(eval(${JSON.stringify(code)}));
          console.log(contextOutput)
        } catch(err) {
        console.log(err)
        }
        `

        // create new temp file containing user code
        fs.writeFile(filePath, runCode, (err) => {
           if (err)
           console.log(err);
           else {
            console.log("File written successfully\n");

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
            stdout = stdout.split('\n')
            stdout = stdout.filter(Boolean)
            let results = {contextOutput: stdout[stdout.length - 1]}
            stdout.pop();
            results.consoleOutput = stdout
            console.log(results)
            res.json((results))
            fs.unlinkSync(filePath)
        });
      }
    });

    } catch(er){
      // if error, delete temp file, send error to client
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
      }
      res.json(String(er))
      next(er)
  }
});


module.exports = router;