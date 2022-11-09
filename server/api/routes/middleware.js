const { models: { User } } = require('../../db');

const verifyToken = async (req, res, next) => {
  try {
    req.user = await User.findByToken(req.headers.authorization);
    next();
  } catch(ex) {
    next(ex);
  }
};

module.exports = verifyToken;
