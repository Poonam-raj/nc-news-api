const express = require("express");
const { getTopics, getEndpoints } = require("../controllers/api");
const articleRouter = require("./article");

const apiRouter = express.Router();

apiRouter.get("/", getEndpoints);
apiRouter.get("/topics", getTopics);
apiRouter.use("/articles", articleRouter);

module.exports = apiRouter;
