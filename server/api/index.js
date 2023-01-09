const express = require("express");
const router = express.Router();

router.use("/users", require("./routes/user"));
router.use("/results", require("./routes/result"));
router.use("/problems", require("./routes/problem"));
router.use("/evaluate", require("./routes/evaluate"));
router.use("/submit", require("./routes/submit"));
router.use("/sessions", require("./routes/sessions"));

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

module.exports = router;
