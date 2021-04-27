const db = require("../connection");
const { createTables, dropTables } = require("../seeds/manage-tables");
const format = require("pg-format");
const {
  formatTimeStamp,
  formatCommentAuthor,
  createLookup
} = require("../utils/data-manipulation");

const seed = async ({ articleData, topicData, userData, commentData }) => {
  await dropTables();
  await createTables();
  const insertTopicsQueryString = format(
    `INSERT INTO topic (slug, description) VALUES %L RETURNING *;`,
    topicData.map(({ slug, description }) => [slug, description])
  );
  const insertingTopics = await db.query(insertTopicsQueryString);

  const insertUserQueryString = format(
    `INSERT INTO "user" (username, avatar_url, name) VALUES %L RETURNING *;`,
    userData.map(({ username, avatar_url, name }) => [
      username,
      avatar_url,
      name,
    ])
  );
  const insertingUsers = await db.query(insertUserQueryString);

  const insertArticleQueryString = format(
    `INSERT INTO article (title, body, votes, topic, author, created_at) VALUES %L RETURNING *;`,
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
  console.log(createLookup(insertingArticles.rows));

  const insertingCommentsQueryString = format(
    `INSERT INTO comment (author, article_id, votes, created_at, body) VALUES %L RETURNING *;`,
    commentData.map(({ created_by, article_id, votes, created_at, body }) => [
      formatCommentAuthor(created_by),
      article_id,
      votes || 0,
      formatTimeStamp(created_at),
      body,
    ])
  );

  const insertingComments = await db.query(insertingCommentsQueryString);
};

module.exports = seed;
