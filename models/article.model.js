const db = require("../db/connection");

exports.fetchArticle = async (articleID) => {
  const articleResponse = await db.query(
    `SELECT article.*, COUNT(comment.comment_id) AS comment_count FROM article 
    LEFT JOIN comment ON comment.article_id = article.article_id
    WHERE article.article_id = $1
    GROUP BY article.article_id `,
    [articleID]
  );
  const article = articleResponse.rows;
  if (article.length === 0) {
    return Promise.reject({
      status: 404,
      msg: `No article found for article_id: ${articleID}.`,
    });
  }
  return article;
};

exports.updateArticle = async (articleID, body) => {
  const { inc_votes } = body;
  const bodyKeys = Object.keys(body);
  if (!inc_votes || typeof inc_votes !== "number" || bodyKeys.length > 1) {
    return Promise.reject({
      status: 400,
      msg: `Bad request: malformed body`,
    });
  } else {
    await db.query(
      `UPDATE article SET 
  votes = votes + $1 WHERE article_id = $2;`,
      [inc_votes, articleID]
    );
    return this.fetchArticle(articleID);
  }
};
