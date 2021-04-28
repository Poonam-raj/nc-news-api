const express = require("express");
const { getArticle } = require("../controllers/article.controller");
const articleRouter = express.Router();

articleRouter.get("/:article_id", getArticle);

module.exports = articleRouter;
