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
