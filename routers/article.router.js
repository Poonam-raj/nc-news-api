const express = require("express");
const {
  getArticle,
  patchArticleByID,
} = require("../controllers/article.controller");
const articleRouter = express.Router();

articleRouter.route("/:article_id").get(getArticle).patch(patchArticleByID);

module.exports = articleRouter;
