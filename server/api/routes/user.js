const {
  models: { User, Result },
} = require("../../db");
const express = require("express");
const router = express.Router();

/* middleware for protecting routes */
const verifyUser = require("../../services/verifyUser.services");

/* get all users */
router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (ex) {
    next(ex);
  }
});

router.get("/user", verifyUser, async (req, res, next) => {
  try {
    res.json(req.user);
  } catch (err) {
    next(err);
  }
});

/* get user by id */
router.get("/:id", verifyUser, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.json(user);
  } catch (ex) {
    next(ex);
  }
});

/* get all results for a user */
router.get("/:id/results", verifyUser, async (req, res, next) => {
  try {
    const results = await Result.findAll({
      where: { userId: req.params.id },
    });
    res.json(results);
  } catch (ex) {
    next(ex);
  }
});

/* create a user */
router.post("/", verifyUser, async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (ex) {
    next(ex);
  }
});

/* update a user by id */
router.put("/:id", verifyUser, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    await user.update(req.body);
    res.json(user);
  } catch (ex) {
    next(ex);
  }
});

/* delete a user by id */
router.delete("/:id", verifyUser, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    await user.destroy();
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;
