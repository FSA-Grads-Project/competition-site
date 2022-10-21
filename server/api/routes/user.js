const { models: { User } } = require('../../db');
const express = require('express');
const router = express.Router();

/* get all users */
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch(ex) {
    next(ex);
  }
});

/* get user by id */
router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.json(user);
  } catch(ex) {
    next(ex);
  }
});

/* create a user */
router.post('/', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch(ex) {
    next(ex);
  }
});

/* update a user by id */
router.put('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    await user.update(req.body);
    res.json(user);
  } catch(ex) {
    next(ex);
  }
});

/* delete a user by id */
router.delete('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    await user.destroy();
    res.sendStatus(204);
  } catch(ex) {
    next(ex);
  }
});

module.exports = router;
