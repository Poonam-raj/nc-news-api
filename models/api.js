const db = require("../db/connection");

exports.selectTopics = async () => {
  const topicResponse = await db.query(`SELECT * FROM topics;`);
  return topicResponse.rows;
};
