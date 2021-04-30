const db = require("../connection.js");

exports.createTables = async () => {
  await db.query(
    `CREATE TABLE topics (slug VARCHAR PRIMARY KEY, description VARCHAR);`
  );
  await db.query(
    `CREATE TABLE users (username VARCHAR PRIMARY KEY, avatar_url VARCHAR, name VARCHAR);`
  );
  await db.query(
    `CREATE TABLE articles (article_id SERIAL PRIMARY KEY, title VARCHAR, body VARCHAR, votes INT DEFAULT 0, topic VARCHAR REFERENCES topic(slug), author VARCHAR REFERENCES "user"(username), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);`
  );
  await db.query(
    `CREATE TABLE comments (comment_id SERIAL PRIMARY KEY, author VARCHAR NOT NULL REFERENCES "user"(username), article_id INT NOT NULL REFERENCES article(article_id), votes INT DEFAULT 0, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, body VARCHAR);`
  );
};

exports.dropTables = async () => {
  await db.query(`DROP TABLE IF EXISTS comments;`);
  await db.query(`DROP TABLE IF EXISTS articles;`);
  await db.query(`DROP TABLE IF EXISTS users;`);
  await db.query(`DROP TABLE IF EXISTS topics;`);
};
