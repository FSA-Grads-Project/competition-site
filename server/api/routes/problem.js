const {
  models: { Result, Problem, User },
} = require("../../db");
const express = require("express");
const router = express.Router();

const { Op } = require("sequelize");

/* middleware for protecting routes */
const {
  verifyUser,
  softVerifyUser,
} = require("../../services/verifyUser.services");

/* get all problems except current*/
router.get("/", async (req, res, next) => {
  try {
    const problems = await Problem.findAll();
    res.json(problems);
  } catch (ex) {
    next(ex);
  }
});

// get current problem
router.get("/current", softVerifyUser, async (req, res, next) => {
  try {
    const now = new Date();

    const problem = await Problem.findOne({
      attributes: [
        "id",
        "title",
        "initialCode",
        "hint1",
        "hint2",
        "hint3",
        "hint4",
        "startDate",
        "endDate",
        "current",
        "timeWeight",
        "spaceWeight",
        req.user ? "statement" : "blurb",
      ],
      where: {
        endDate: {
          [Op.gt]: now,
        },
        startDate: {
          [Op.lte]: now,
        },
      },
    });

    res.json(problem);
  } catch (ex) {
    next(ex);
  }
});

// get current problem
router.get("/previousProblems", softVerifyUser, async (req, res, next) => {
  try {
    const now = new Date();

    const problems = await Problem.findAll({
      where: {
        endDate: {
          [Op.lte]: now,
        },
      },
    });

    res.send(problems);
  } catch (ex) {
    next(ex);
  }
});

/* get problem by id */
router.get("/:id", async (req, res, next) => {
  try {
    const problem = await Problem.findByPk(req.params.id);
    res.json(problem);
  } catch (ex) {
    next(ex);
  }
});

/* get all results joined with user info for a problem */
router.get("/:id/results", async (req, res, next) => {
  try {
    const results = await Result.findAll({
      attributes:[ 
        'spaceUsed',
        'timeElapsed',
        'startDatetime',
        'completeDatetime'
      ],
      include: { 
        model: User,
        attributes: [
          'id',
          'alias'
        ]
      },
      where: {
        completeDatetime: { [Op.not]: null },
        problemId: req.params.id
      },
    });
    res.json(results);
  } catch (ex) {
    next(ex);
  }
});

/* create a new problem */
router.post("/", verifyUser, async (req, res, next) => {
  try {
    const problem = await Problem.create(req.body);
    res.json(problem);
  } catch (ex) {
    next(ex);
  }
});

/* update problem by id */
router.put("/:id", verifyUser, async (req, res, next) => {
  try {
    const problem = await Problem.findByPk(req.params.id);
    await problem.update(req.body);
    res.json(problem);
  } catch (ex) {
    next(ex);
  }
});

/* delete problem by id */
router.delete("/:id", verifyUser, async (req, res, next) => {
  try {
    const problem = await Problem.findByPk(req.params.id);
    await problem.destroy();
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});

// evaluate problem

router.post("/evaluate", async (req, res, next) => {
  try {
    console.log(req.body.code);
    res.json("success!");
  } catch (ex) {
    next(ex);
  }
});

router.post("/submit", async (req, res, next) => {
  try {
    console.log(req.body.code);
    res.json("success!");
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;
