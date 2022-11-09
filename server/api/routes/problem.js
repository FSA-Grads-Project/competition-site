const { models: { Result, Problem } } = require('../../db');
const express = require('express');
const router = express.Router();

/* get all problems */
router.get('/', async (req, res, next) => {
  try {
    const problems = await Problem.findAll();
    res.json(problems);
  } catch(ex) {
    next(ex);
  }
});

/* get problem by id */
router.get('/:id', async (req, res, next) => {
  try {
    const problem = await Problem.findByPk(req.params.id);
    res.json(problem);
  } catch(ex) {
    next(ex);
  }
});

/* get all results for a problem */
router.get('/:id/results', async (req, res, next) => {
  try {
    const results = await Result.findAll({
      where: { problemId: req.params.id } 
    });
    res.json(results);
  } catch(ex) {
    next(ex);
  }
});

/* create a new problem */
router.post('/', async (req, res, next) => {
  try {
    const problem = await Problem.create(req.body);
    res.json(problem);
  } catch(ex) {
    next(ex);
  }
});

/* update problem by id */
router.put('/:id', async (req, res, next) => {
  try {
    const problem = await Problem.findByPk(req.params.id);
    await problem.update(req.body);
    res.json(problem);
  } catch(ex) {
    next(ex);
  }
});

/* delete problem by id */
router.delete('/:id', async (req, res, next) => {
  try {
    const problem = await Problem.findByPk(req.params.id);
    await problem.destroy();
    res.sendStatus(204);
  } catch(ex) {
    next(ex);
  }
});

// evaluate problem

router.post('/evaluate', async (req, res, next) => {
  try {
    console.log(req.body.code)
    res.json('success!')
  } catch(ex) {
    next(ex);
  }
});

router.post('/submit', async (req, res, next) => {
  try {
    console.log(req.body.code)
    res.json('success!')
  } catch(ex) {
    next(ex);
  }
});

module.exports = router;
