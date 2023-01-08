// Third Party Library Imports
const jwt = require("jsonwebtoken");

// Local Imports
const {
  models: { User },
} = require("../db");

const createRefreshToken = (user, res) => {
  const refreshToken = jwt.sign(
    {
      userId: user.id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "90d" }
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
    { expiresIn: "10m" }
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

const verifyToken = async (token, tokenType, res) => {
  const tokenSecrets = {
    access: "ACCESS_TOKEN_SECRET",
    refresh: "REFRESH_TOKEN_SECRET",
  };

  try {
    const tokenData = jwt.verify(token, process.env[tokenSecrets[tokenType]]);
    return tokenData;
  } catch (err) {
    if (err.message === "jwt expired" && tokenType === "refresh") {
      const { userId } = decodeToken(token);
      const user = await User.findOne({ where: { id: userId } });

      clearRefreshToken(user, res);
    }
    throw err;
  }
};

const decodeToken = (token) => {
  let base64Url = token.split(".")[1];
  let base64 = decodeURIComponent(
    atob(base64Url)
      .split("")
      .map((c) => {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(base64);
};

module.exports = {
  createRefreshToken,
  setRefreshTokenCookie,
  createAccessToken,
  clearRefreshToken,
  retrieveCookies,
  updateUserRefreshToken,
  verifyToken,
  decodeToken,
};
