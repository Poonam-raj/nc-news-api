const db = require("../db/connection");
const { checkArticleID } = require("./utils");

exports.fetchCommentsByID = async (articleID) => {
  const commentsResponse = await db.query(
    `SELECT * FROM comments WHERE article_id = $1`,
    [articleID]
  );
  if (commentsResponse.rowCount === 0) {
    await checkArticleID(articleID);
  }
  return commentsResponse.rows;
};

exports.insertComment = async (articleID, username, body) => {
  const insertedComment = await db.query(
    `
  INSERT INTO comments (author, body, article_id) VALUES ($1, $2, $3) RETURNING *;`,
    [username, body, articleID]
  );
  return insertedComment.rows[0];
};
