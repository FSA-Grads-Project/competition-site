const express = require('express');
const router = express.Router();
const { models: { Test } } = require('../../db');
const executeCode = require('./executeCode')

router.post('/:id', async (req, res, next) => {
  // code is user code
  let code = req.body.code

 

      try {
        let response = await Test.findOne({
          where: { problemId: req.params.id }
        });
        
        let problem = response.dataValues.test;

        executeCode(code,problem,res)
      

    } catch(er){
      console.log(er)
      next(er)
  }
});


module.exports = router;