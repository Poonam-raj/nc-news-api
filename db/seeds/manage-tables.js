const db = require("../connection.js");

const createTables = async () => {
  await db.query(
    `CREATE TABLE topic (slug VARCHAR PRIMARY KEY, description VARCHAR);`
  );
  await db.query(
    `CREATE TABLE user (username VARCHAR PRIMARY KEY, avatar_url VARCHAR, name VARCHAR);`
  );
  await db.query(
    `CREATE TABLE article (article_id SERIAL PRIMARY KEY, title VARCHAR, body VARCHAR, votes INT DEFAULT 0, topic VARCHAR REFERENCES topic(slug), author VARCHAR REFERENCES user(username), created_at BIGINT);`
  );
  await db.query(
    `CREATE TABLE comment (comment_id SERIAL PRIMARY KEY, author VARCHAR REFERENCES user(username), article_id INT REFERENCES article(article_id), votes INT DEFAULT 0, created_at BIGINT, body VARCHAR);`
  );
};
