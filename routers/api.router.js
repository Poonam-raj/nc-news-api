const express = require("express");
const { getTopics } = require("../controllers/api.controller");
const articleRouter = require("./article.router");

const apiRouter = express.Router();

apiRouter.get("/topics", getTopics);
apiRouter.use("/articles", articleRouter);

module.exports = apiRouter;
