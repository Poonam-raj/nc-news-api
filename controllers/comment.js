const { fetchCommentsByID } = require("../models/comment");

exports.getCommentsByArticleID = (req, res, next) => {
  fetchCommentsByID(req.params.article_id)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch(next);
};
