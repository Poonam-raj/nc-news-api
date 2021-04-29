const db = require("../db/connection");
const { isMalformedBody } = require("./utils");

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
  const acceptedColumns = [
    "author",
    "title",
    "article_id",
    "topic",
    "created_at",
    "votes",
    "comment_count",
  ];

  if (!acceptedColumns.includes(sort_by)) {
    return Promise.reject({ status: 400, msg: "Bad Query" });
  }

  let queryStr = `
  SELECT article.author, title, article.article_id, topic, article.created_at, article.votes, COUNT(comment.comment_id) AS comment_count 
  FROM article 
  LEFT JOIN comment ON comment.article_id = article.article_id`;

  const queryValues = [];

  if (topic) {
    queryStr += ` WHERE topic = $1`;
    queryValues.push(topic);
  }

  queryStr += ` GROUP BY article.article_id
  ORDER BY ${sort_by} ${order};`;

  const articlesResponse = await db.query(queryStr, queryValues);

  return articlesResponse.rows;
};
