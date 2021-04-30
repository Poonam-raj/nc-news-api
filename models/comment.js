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
