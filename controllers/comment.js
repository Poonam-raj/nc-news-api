const {
  fetchCommentsByID,
  insertComment,
  dropCommentById,
} = require('../models/comment');

exports.getCommentsByArticleID = (req, res, next) => {
  fetchCommentsByID(req.params.article_id)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch(next);
};

exports.postCommentByArticleID = (req, res, next) => {
  insertComment(req.params.article_id, req.body)
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch(next);
};

exports.deleteCommentById = (req, res, next) => {
  const { comment_id } = req.params;
  dropCommentById(comment_id)
    .then(() => {
      res.status(204).send();
    })
    .catch(next);
};
