const jwt = require("jsonwebtoken");

const createRefreshToken = (user, res) => {
  const refreshToken = jwt.sign(
    {
      userId: user.id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1y" }
  );

  return refreshToken;
};

const setRefreshTokenCookie = (refreshToken, res) => {
  const refreshTokenCookieOptions = {
    maxAge: 3.154e10, // 1 year
    httpOnly: true,
    domain: "localhost",
    path: "/",
    sameSite: "lax",
    secure: false,
  };

  res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);
};

const createAccessToken = (user) => {
  const accessToken = jwt.sign(
    {
      userId: user.id,
      admin: user.admin,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "5m" }
  );

  return accessToken;
};

const clearRefreshToken = (user, res) => {
  updateUserRefreshToken(user, "");

  res.clearCookie("refreshToken", { domain: "localhost", path: "/" });
};

const retrieveCookies = (req) => {
  const cookies = {};

  const cookiesArray = req.headers.cookie?.split(";");

  cookiesArray?.forEach((cookie) => {
    const [key, value] = cookie.trim().split("=");
    cookies[key] = value;
  });

  return cookies;
};

const updateUserRefreshToken = async (user, refreshToken) => {
  await user.update({ refreshToken: refreshToken });
};

module.exports = {
  createRefreshToken,
  setRefreshTokenCookie,
  createAccessToken,
  clearRefreshToken,
  retrieveCookies,
  updateUserRefreshToken,
};
