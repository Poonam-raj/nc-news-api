const {
  fetchArticle,
  updateArticle,
  fetchAllArticles,
} = require("../models/article");

exports.getArticle = (req, res, next) => {
  fetchArticle(req.params.article_id)
    .then((article) => {
      res.status(200).send({ article: article[0] });
    })
    .catch(next);
};

exports.patchArticleByID = (req, res, next) => {
  updateArticle(req.params.article_id, req.body)
    .then((updatedArticle) => {
      res.status(200).send({ article: updatedArticle[0] });
    })
    .catch(next);
};

exports.getAllArticles = (req, res, next) => {
  const { sort_by, order, topic } = req.query;
  fetchAllArticles(sort_by, order, topic)
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch(next);
};
