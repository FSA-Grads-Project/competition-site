// Local Imports
const {
  models: { User },
} = require("../db");
const { retrieveCookies, verifyToken } = require("./token.services");

const verifyUser = async (req, res, next) => {
  try {
    const refreshToken = retrieveCookies(req).refreshToken;

    if (!refreshToken) {
      res.status(403).send({ message: "No Refresh Token Found" });
      next();
    }

    const accessToken = req.headers.accesstoken;

    await verifyToken(refreshToken, "refresh", res);
    const { userId } = await verifyToken(accessToken, "access", res);

    req.user = await User.findOne({
      where: {
        id: userId,
      },
    });

    next();
  } catch (ex) {
    if (ex.message === "jwt expired") {
      res.status(403).send(ex);
    }
    next(ex);
  }
};

module.exports = verifyUser;
