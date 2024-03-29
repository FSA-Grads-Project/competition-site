// System Library Imports
const express = require("express");
const axios = require("axios");
const router = express.Router();

// Local Imports
const {
  models: { User },
} = require("../../db");

const {
  getGoogleTokens,
  getUserInfo,
} = require("../../services/googleOAuth.services");

const {
  getGithubTokens,
  getGithubUserInfo,
} = require("../../services/githubOAuth.services");

const {
  getLinkedinTokens,
  getLinkedinUserInfo,
} = require("../../services/linkedinOAuth.services");

const {
  createRefreshToken,
  setRefreshTokenCookie,
  createAccessToken,
  retrieveCookies,
  clearRefreshToken,
  updateUserRefreshToken,
  verifyToken,
  decodeToken,
} = require("../../services/token.services");

const { loginUser } = require("../../services/loginUser.services");

/* Route redirected directly from google -- contains code */
router.get("/oauth/google", async (req, res, next) => {
  try {
    // Get the code from querystring
    const code = req.query.code;

    // Get the id and access tokens with the code
    const { id_token, access_token, refresh_token } = await getGoogleTokens(
      code,
      axios
    );

    // Get googleUser with tokens
    const googleUser = await getUserInfo(id_token, access_token, axios);

    const user = await loginUser(googleUser);

    // create refresh token
    const refreshToken = createRefreshToken(user);

    // Update user with refresh token
    updateUserRefreshToken(user, refreshToken);

    // set cookies
    setRefreshTokenCookie(refreshToken, res);

    // redirect back to client
    res.redirect(`http://localhost:3000/login?path=${req.query.state}`);
  } catch (ex) {
    next(ex);
  }
});

/* Route redirected directly from github -- contains code */
router.get("/oauth/github", async (req, res, next) => {
  try {
    // Get the code from querystring
    const code = req.query.code;

    // Get the id and access tokens with the code
    const access_token = await getGithubTokens(code, axios);

    // Get githubUser with tokens
    const githubUser = await getGithubUserInfo(access_token, axios);

    const user = await loginUser(githubUser);

    // create refresh token
    const refreshToken = createRefreshToken(user);

    // Update user with refresh token
    updateUserRefreshToken(user, refreshToken);

    // set cookies
    setRefreshTokenCookie(refreshToken, res);

    // redirect back to client
    res.redirect(`http://localhost:3000/login?path=${req.query.state}`);
  } catch (ex) {
    next(ex);
  }
});

/* Route redirected directly from linkedin -- contains code */
router.get("/oauth/linkedin", async (req, res, next) => {
  try {
    // Get the code from querystring
    const code = req.query.code;

    // Get the id and access tokens with the code
    const access_token = await getLinkedinTokens(code, axios);

    // Get linkedinUser with tokens
    const linkedinUser = await getLinkedinUserInfo(access_token, axios);

    const user = await loginUser(linkedinUser);

    // create refresh token
    const refreshToken = createRefreshToken(user);

    // Update user with refresh token
    updateUserRefreshToken(user, refreshToken);

    // set cookies
    setRefreshTokenCookie(refreshToken, res);

    // redirect back to client
    res.redirect(`http://localhost:3000/login?path=${req.query.state}`);
  } catch (ex) {
    next(ex);
  }
});

/* Route to get new access token from refresh token
	 Also creates new refresh token as part of refresh token rotation security measures */
router.get("/getAccessToken", async (req, res, next) => {
  try {
    // Retrieve cookies from request (only cookie we care about is the refresh token)
    const cookies = retrieveCookies(req);

    // confirm if refresh token exists, if not return error message
    if (!cookies.refreshToken) {
      res.status(403).send({ message: "No Refresh Token Found" });
      return;
    }

    // validate the refresh token and retrieve userId from token
    const tokenData = await verifyToken(cookies.refreshToken, "refresh", res);

    const { userId } = tokenData;

    // find user by userId retrieved from refresh token
    const user = await User.findOne({ where: { id: userId } });

    // compare refresh token in db (saved to user) vs refresh token from cookie
    // if they don't match, clear the cookie in the browser and clear refresh token from user
    // this will require a new login
    if (user.refreshToken !== cookies.refreshToken) {
      // Clear refresh token from both user model and cookies if they don't match
      // This is in the event that somone is trying to use malicious code. It resets the users token so they must re-login to get a new token
      clearRefreshToken(user, res);

      res.status(403).send({ message: "Refresh Token Doesnt Match" });
      return;
    }

    // Creates a new access token to send to client as part of refresh token rotation
    const accessToken = createAccessToken(user);

    // create new refresh token
    const newRefreshToken = createRefreshToken(user);

    // Update user with refresh token
    updateUserRefreshToken(user, newRefreshToken);

    // set cookies
    setRefreshTokenCookie(newRefreshToken, res);

    res.send(accessToken);
  } catch (err) {
    res.status(403).send(err);
  }
});

/* Remove refresh token from user and clear refresh token cookie to sign user out */
router.get("/clearRefreshToken", async (req, res, next) => {
  try {
    const cookies = retrieveCookies(req);

    const { userId } = await verifyToken(cookies.refreshToken, "refresh", res);

    const user = await User.findOne({ where: { id: userId } });

    clearRefreshToken(user, res);

    res.status(204).end();
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshToken = retrieveCookies(req).refreshToken;

      const { userId } = decodeToken(refreshToken);

      if (userId) {
        const user = await User.findOne({ where: { id: userId } });
        clearRefreshToken(user, res);
      } else {
        res.clearCookie("refreshToken", { domain: "localhost", path: "/" });
      }
    }
    res.status(204).end();
  }
});

module.exports = router;
