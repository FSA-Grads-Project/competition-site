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

/* get result by id */
router.get('/:id', async (req, res, next) => {
  try {
    const result = await Result.findByPk(req.params.id);
    res.json(result);
  } catch(ex) {
    next(ex);
  }
});

/* create a new result */
router.post('/', async (req, res, next) => {
  try {
    const result = await Result.create(req.body);
    res.json(result);
  } catch(ex) {
    next(ex);
  }
});

/* update result by id */
router.put('/:id', async (req, res, next) => {
  try {
    const result = await Result.findByPk(req.params.id);
    await result.update(req.body);
    res.json(result);
  } catch(ex) {
    next(ex);
  }
});

/* delete result by id */
router.delete('/:id', async (req, res, next) => {
  try {
    const result = await Result.findByPk(req.params.id);
    await result.destroy();
    res.sendStatus(204);
  } catch(ex) {
    next(ex);
  }
});

module.exports = router;
