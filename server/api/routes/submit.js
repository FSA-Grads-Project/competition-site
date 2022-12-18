const express = require('express');
const fs = require('fs');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const { spawn } = require("child_process")
const vm = require('vm');

router.post('/', async (req, res, next) => {
  let code = req.body.code
  let fileName = uuidv4() + '.js';
  let filePath = path.join(__dirname, `/temp/${fileName}`);

      try {
          fs.writeFileSync(filePath, code);

          const consoleOutput = spawn("node", [filePath]);

          const sandbox = {}
          vm.createContext(sandbox);

          const contextOutput = vm.runInContext(code,sandbox)
          let consoles = []
          let contextOutputArray = [contextOutput]
          let result = { contextOutput: contextOutputArray, type: "", data: consoles | [], error: ""};
      
          consoleOutput.stdout.on('data', function (data) {
            consoles.push(data.toString().trim());
            result.type = "success";
            result.data = consoles
        });

          consoleOutput.stderr.on('data', function (error) {
            result.type = "error";
            result.error = error.toString();
        });

          consoleOutput.on('close', (code) => {
            fs.unlinkSync(filePath)
            res.json(result)
      });

    } catch(er){
      fs.unlinkSync(filePath)
      res.json(String(er))
      next(er)
  }
});


module.exports = router;