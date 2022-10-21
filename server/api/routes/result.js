const { models: { Result } } = require('../../db');
const express = require('express');
const router = express.Router();

/* get all results */
router.get('/', async (req, res, next) => {
  try {
    const results = await Result.findAll();
    res.json(results);
  } catch(ex) {
    next(ex);
  }
});

module.exports = router;
