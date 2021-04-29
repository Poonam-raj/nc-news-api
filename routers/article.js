const express = require("express");
const {
  getArticle,
  patchArticleByID,
  getAllArticles,
} = require("../controllers/article");
const articleRouter = express.Router();

articleRouter.route("/:article_id").get(getArticle).patch(patchArticleByID);
articleRouter.route("/").get(getAllArticles);

module.exports = articleRouter;
