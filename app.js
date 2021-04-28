const express = require("express");
const apiRouter = require("./routers/api.router");

const app = express();

app.use("/api", apiRouter);
app.use((err, req, res, next) => {
  if (err.status === 404) {
    res.status(404).send({ msg: err.msg });
  } else if (err.code === "22P02") {
    res.status(400).send({ msg: "Invalid ID" });
  } else res.status(500).send({ msg: "Internal Server Error" });
});

module.exports = app;
