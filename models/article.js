const db = require("../db/connection");
const {
  isMalformedBody,
  checkQuery,
  formFetchArticleQueryStr,
} = require("./utils");

exports.fetchArticle = async (articleID) => {
  const articleResponse = await db.query(
    `SELECT article.*, COUNT(comment.comment_id) AS comment_count FROM article 
    LEFT JOIN comment ON comment.article_id = article.article_id
    WHERE article.article_id = $1
    GROUP BY article.article_id;`,
    [articleID]
  );
  const { rows } = articleResponse;

  if (articleResponse.rowCount === 0) {
    return Promise.reject({
      status: 404,
      msg: `Article_id: ${articleID} is invalid.`,
    });
  }

  return rows;
};

exports.updateArticle = async (articleID, body) => {
  const { inc_votes } = body;
  await isMalformedBody(inc_votes, body);
  await db.query(
    `UPDATE article SET 
  votes = votes + $1 WHERE article_id = $2;`,
    [inc_votes, articleID]
  );

  return this.fetchArticle(articleID);
};

exports.fetchAllArticles = async (
  sort_by = "created_at",
  order = "DESC",
  topic
) => {
  await checkQuery(sort_by, order);
  const { queryStr, queryValues } = await formFetchArticleQueryStr(
    sort_by,
    order,
    topic
  );

  const articlesResponse = await db.query(queryStr, queryValues);
  return articlesResponse.rows;
};
