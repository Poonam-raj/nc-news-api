const db = require("../connection");
const { createTables, dropTables } = require("../seeds/manage-tables");
const format = require("pg-format");
const {
  formatTimeStamp,
  formatCommentAuthor,
  createLookup,
  formatCommentArticleID,
} = require("../utils/data-manipulation");

const seed = async ({ articleData, topicData, userData, commentData }) => {
  await dropTables();
  await createTables();
  const insertTopicsQueryString = format(
    `INSERT INTO topics (slug, description) VALUES %L RETURNING *;`,
    topicData.map(({ slug, description }) => [slug, description])
  );
  await db.query(insertTopicsQueryString);

  const insertUserQueryString = format(
    `INSERT INTO users (username, avatar_url, name) VALUES %L RETURNING *;`,
    userData.map(({ username, avatar_url, name }) => [
      username,
      avatar_url,
      name,
    ])
  );
  await db.query(insertUserQueryString);

  const insertArticleQueryString = format(
    `INSERT INTO articles (title, body, votes, topic, author, created_at) VALUES %L RETURNING *;`,
    articleData.map(({ title, body, votes, topic, author, created_at }) => [
      title,
      body,
      votes || 0,
      topic,
      author,
      formatTimeStamp(created_at),
    ])
  );

  const insertingArticles = await db.query(insertArticleQueryString);

  const lookup = createLookup(insertingArticles.rows);

  const commentAuthor = formatCommentAuthor(commentData);

  const newComments = formatCommentArticleID(commentAuthor, lookup);

  const insertingCommentsQueryString = format(
    `INSERT INTO comments (author, article_id, votes, created_at, body) VALUES %L RETURNING *;`,

    newComments.map(({ author, article_id, votes, created_at, body }) => [
      author,
      article_id,
      votes || 0,
      formatTimeStamp(created_at),
      body,
    ])
  );

  await db.query(insertingCommentsQueryString);
};

module.exports = seed;
