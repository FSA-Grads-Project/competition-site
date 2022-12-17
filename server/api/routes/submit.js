const express = require('express');
const fs = require('fs');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const path = require('path');

router.post('/', async (req, res, next) => {
  let code = req.body.code
  let fileName = uuidv4() + '.js';
  let filePath = path.join(__dirname, `/temp/${fileName}`);

  try {
    if (req.body.code){
    fs.writeFile(filePath, code, async (err)=>{
      if(err){
      console.log(err)
      res.json(String(err))
      } else {
          try {

            fs.readFile(filePath, "utf8", (er, data) => {
              if (er) {
                console.log(er)
              } else {
                code = data
              }

              fs.unlink(filePath, function(err){
                if (err) {
                  console.log(err)
                } else {
                  console.log('file deleted')
                }
              })
            })

            const output = eval(code);
            console.log(String(output));
          
            res.json(String(output))
        
          } 
          catch(er){
            res.json(String(er))
            next(er)
        }
      }
    });
  }
  } catch(er) {
      next(er);
  } finally {
      if (fs.existsSync(filePath))
        fs.unlink(filePath, function(err){
          if (err) {
            console.log(err)
          } else {
            console.log('file deleted')
          }
      })

  }
});


module.exports = router;