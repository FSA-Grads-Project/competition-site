const express = require('express');
const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    console.log(req.body.code)
    res.json('success!')
  } catch(ex) {
    next(ex);
  }
});

module.exports = router;