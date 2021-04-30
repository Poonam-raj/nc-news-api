const db = require("../db/connection");

exports.fetchCommentsByID = async (articleID) => {
  const commentsResponse = await db.query(
    `SELECT * FROM comment WHERE article_id = $1`,
    [articleID]
  );
  return commentsResponse.rows;
};
