const express = require("express");
const {
  getArticle,
  patchArticleByID,
  getAllArticles,
} = require("../controllers/article");
const {
  getCommentsByArticleID,
  postCommentByArticleID,
} = require("../controllers/comment");

const articleRouter = express.Router();

articleRouter
  .route("/:article_id/comments")
  .get(getCommentsByArticleID)
  .post(postCommentByArticleID);

articleRouter.route("/:article_id").get(getArticle).patch(patchArticleByID);

articleRouter.route("/").get(getAllArticles);

module.exports = articleRouter;
