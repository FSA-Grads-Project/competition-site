require("dotenv").config();

const express = require("express");
const path = require("path");
const app = express();

// set spacing for displaying json
app.set("json spaces", 2);

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

// require routes
app.use("/api", require("./api"));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "..", "public/index.html"), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "internal server error");
});

module.exports = app;
