const { models: { User } } = require('../db');
const express = require('express');
const router = express.Router();

router.post('/login', async (req, res, next) => {
  try {
    const token = await User.authenticate(req.body);
    res.send({ token: token });
  } catch(ex) {
    next(ex);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.send(user);
  } catch(ex) {
    if (ex.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('user already exists');
    } else {
      next(ex);
    }
  }
});

router.get('/user', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(user);
  } catch(ex) {
    next(ex);
  }
});

module.exports = router;
