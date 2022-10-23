const express = require('express');
const router = express.Router();

router.use('/users', require('./routes/user'));
router.use('/results', require('./routes/result'));
router.use('/problems', require('./routes/problem'));

module.exports = router;
