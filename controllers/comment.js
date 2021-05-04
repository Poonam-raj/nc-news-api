const { fetchCommentsByID, insertComment } = require("../models/comment");

exports.getCommentsByArticleID = (req, res, next) => {
  fetchCommentsByID(req.params.article_id)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch(next);
};

exports.postCommentByArticleID = (req, res, next) => {
  const { username, body } = req.body;
  insertComment(req.params.article_id, username, body)
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch(next);
};
