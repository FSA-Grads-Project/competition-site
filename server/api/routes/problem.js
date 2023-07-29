const {
  models: { Result, Problem, User, Test },
} = require("../../db");
const express = require("express");
const router = express.Router();
const Sequelize = require("sequelize");

const { Op } = require("sequelize");

/* middleware for protecting routes */
const {
  verifyUser,
  softVerifyUser,
} = require("../../services/verifyUser.services");

/* get all problems except current*/
router.get("/", async (req, res, next) => {
  try {
    const now = new Date();

    const problems = await Problem.findAll({
      attributes: [
        "id",
        "title",
        "startDate",
        "endDate",
        "current",
        "numberOfLinesForReadOnly",
        "blurb",
      ],
      where: {
        startDate: {
          [Op.lte]: now,
        },
      },
    });
    res.json(problems);
  } catch (ex) {
    next(ex);
  }
});

/* get full problem details for all problems*/
router.get("/admin", verifyUser, async (req, res, next) => {
  try {

    if (!req.user.admin){
      throw new Error('Unauthorized')
    }

    const problems = await Problem.findAll({
      include: [{
        model: Test
      }]
    });
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
        "hint",
        "startDate",
        "endDate",
        "current",
        "timeWeight",
        "spaceWeight",
        "numberOfLinesForReadOnly",
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
      attributes: [
        "spaceUsed",
        "timeElapsed",
        "startDatetime",
        "completeDatetime",
      ],
      include: {
        model: User,
        attributes: ["id", "alias"],
      },
      where: {
        completeDatetime: { [Op.not]: null },
        problemId: req.params.id,
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
    const user = req.user
    if (!user.admin) throw new Error ('Not authorized to create new problems')

    //Get the end date of the last problem
    const maxEndDate = (await Problem.findOne({
      attributes: [
        [Sequelize.fn('max', Sequelize.col('endDate')), 'maxEndDate'],
      ],
    })).dataValues.maxEndDate;

    //Logic to automate assigning start and end dates based on last end date
    let newStartDate = new Date(maxEndDate)
    newStartDate.setDate(newStartDate.getDate() + 1)
    const currentDate = new Date()
    newStartDate = new Date(new Date(Math.max(newStartDate, currentDate)).toISOString().split('T')[0])
    const newEndDate = new Date(newStartDate)
    newEndDate.setDate(newEndDate.getDate() + 31)

    const newProblemData = req.body

    // adds the start date and end dates from above to the req.body data
    newProblemData.startDate = newStartDate
    newProblemData.endDate = newEndDate

    // creates new problem
    const newProblem = await Problem.create(newProblemData)

    // creates new tests for newly created problem
    const newTests = await Test.create({problemId: newProblem.id, test: newProblemData.test})

    // fetches all problems to return to front end
    const problems = await Problem.findAll({
      include: [{
        model: Test
      }]
    });
    res.json(problems);
  } catch (ex) {
    next(ex);
  }
});

/* update problem by id */
router.put("/:id", verifyUser, async (req, res, next) => {
  try {

    const user = req.user
    if (!user.admin) throw new Error ('Not authorized to create new problems')

    const problem = await Problem.findByPk(req.params.id);
    await problem.update(req.body);

    const test = await Test.findOne({where: {problemId: req.params.id}})
    await test.update(req.body)

    const problems = await Problem.findAll({
      include: [{
        model: Test
      }]
    });
    res.json(problems);
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
