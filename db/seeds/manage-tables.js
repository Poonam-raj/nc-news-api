const db = require("../connection.js");

exports.createTables = async () => {
  await db.query(
    `CREATE TABLE topic (slug VARCHAR PRIMARY KEY, description VARCHAR);`
  );
  await db.query(
    `CREATE TABLE "user" (username VARCHAR PRIMARY KEY, avatar_url VARCHAR, name VARCHAR);`
  );
  await db.query(
    `CREATE TABLE article (article_id SERIAL PRIMARY KEY, title VARCHAR, body VARCHAR, votes INT DEFAULT 0, topic VARCHAR REFERENCES topic(slug), author VARCHAR REFERENCES "user"(username), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);`
  );
  await db.query(
    `CREATE TABLE comment (comment_id SERIAL PRIMARY KEY, author VARCHAR REFERENCES "user"(username), article_id INT REFERENCES article(article_id), votes INT DEFAULT 0, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, body VARCHAR);`
  );
};

exports.dropTables = async () => {
  await db.query(`DROP TABLE IF EXISTS comment;`);
  await db.query(`DROP TABLE IF EXISTS article;`);
  await db.query(`DROP TABLE IF EXISTS "user";`);
  await db.query(`DROP TABLE IF EXISTS topic;`);
};
