const {
  models: { Result },
} = require("../../db");
const express = require("express");
const router = express.Router();

/* middleware for protecting routes */
const {
  verifyUser,
  softVerifyUser,
} = require("../../services/verifyUser.services");

/* get all results */
router.get("/", async (req, res, next) => {
  try {
    const results = await Result.findAll();
    res.json(results);
  } catch (ex) {
    next(ex);
  }
});

// get user's solution to a problem
router.get("/solution/:id", softVerifyUser, async (req, res, next) => {
  try {
    let solution = {};
    if (req.user) {
      result = await Result.findOne({
        where: {
          userId: req.user.id,
          problemId: req.params.id,
        },
      });
    }
    res.json(result);
  } catch (ex) {
    next(ex);
  }
});

router.post("/solution", verifyUser, async (req, res, next) => {
  try {
    const solution = await Result.create({
      userId: req.user.id,
      problemId: req.body.id,
      startDatetime: new Date().getTime(),
    });
    res.status(201).send(solution);
  } catch (ex) {
    next(ex);
  }
});

router.put("/solution/:id", verifyUser, async (req, res, next) => {
  try {
    const now = new Date().getTime();
    const result = await Result.findByPk(req.params.id);
    if (req.body.type === "eval") {
      await result.update({ ...req.body });
    } else {
      await result.update({ ...req.body, completeDatetime: now });
    }

    console.log(result);

    res.json(result);
  } catch (ex) {
    next(ex);
  }
});

/* get result by id */
router.get("/:id", verifyUser, async (req, res, next) => {
  try {
    const result = await Result.findByPk(req.params.id);
    res.json(result);
  } catch (ex) {
    next(ex);
  }
});

/* create a new result */
router.post("/", verifyUser, async (req, res, next) => {
  try {
    const result = await Result.create(req.body);
    res.json(result);
  } catch (ex) {
    next(ex);
  }
});

/* update result by id */
router.put("/:id", verifyUser, async (req, res, next) => {
  try {
    const result = await Result.findByPk(req.params.id);
    await result.update(req.body);
    res.json(result);
  } catch (ex) {
    next(ex);
  }
});

/* delete result by id */
router.delete("/:id", verifyUser, async (req, res, next) => {
  try {
    const result = await Result.findByPk(req.params.id);
    await result.destroy();
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;
