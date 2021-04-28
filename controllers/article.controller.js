const seed = require("../db/seeds/seed");
const {
  fetchArticle,
  updateArticle,
  fetchAllArticles,
} = require("../models/article.model");

exports.getArticle = (req, res, next) => {
  fetchArticle(req.params.article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.patchArticleByID = (req, res, next) => {
  updateArticle(req.params.article_id, req.body)
    .then((updatedArticle) => {
      res.status(200).send({ updatedArticle });
    })
    .catch(next);
};

exports.getAllArticles = (req, res, next) => {
  fetchAllArticles().then((articles) => {
    res.status(200).send({ articles });
  });
};
