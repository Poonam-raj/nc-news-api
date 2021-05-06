const express = require("express");
const { getTopics, getEndpoints } = require("../controllers/api");
const articleRouter = require("./article");

const apiRouter = express.Router();

apiRouter.get("/topics", getTopics);
apiRouter.use("/articles", articleRouter);
apiRouter.get("/", getEndpoints);

module.exports = apiRouter;
