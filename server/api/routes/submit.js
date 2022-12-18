const express = require('express');
const fs = require('fs');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const { spawn } = require("child_process")
const vm = require('vm');

router.post('/', async (req, res, next) => {

  // code is user code
  let code = req.body.code
  // create random filename
  let fileName = uuidv4() + '.js';
  // create filepath in temp folder utilizing random filename 
  let filePath = path.join(__dirname, `/temp/${fileName}`);

      try {

        // create new temp file containing user code
          fs.writeFileSync(filePath, code);
        
        // execute file in vm sandbox + capture return value of last line of executable code and assign to contextOutput
          const sandbox = {}
          vm.createContext(sandbox);
          let script = new vm.Script(code);
          const contextOutput = script.runInContext(sandbox, {
            console: console,
        });
          console.log(contextOutput)
          let contextOutputArray = [contextOutput]

        // start stream to execute file to capture consoles or error
          const consoleOutput = spawn("node", [filePath]);
          let consoles = []

        // create result object to send back to client
          let result = { contextOutput: contextOutputArray, type: "", data: consoles | [], error: ""};
        
        // listen for consoles, add to console array to add to result object
          consoleOutput.stdout.on('data', function (data) {
            consoles.push(data.toString().trim());
            result.type = "success";
            result.data = consoles
        });

        // listen for errors, add to result object
          consoleOutput.stderr.on('data', function (error) {
            result.type = "error";
            result.error = error.toString();
        });
        // listen for closing of stream, delete temp file + send result object to client
          consoleOutput.on('close', (code) => {
            fs.unlinkSync(filePath)
            res.json(result)
      });

    } catch(er){
      // if error, delete temp file, send error to client
      fs.unlinkSync(filePath)
      res.json(String(er))
      next(er)
  }
});


module.exports = router;