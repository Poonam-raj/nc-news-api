const express = require("express");
const { getTopics } = require("../controllers/api");
const articleRouter = require("./article");

const apiRouter = express.Router();

apiRouter.get("/topics", getTopics);
apiRouter.use("/articles", articleRouter);

module.exports = apiRouter;
