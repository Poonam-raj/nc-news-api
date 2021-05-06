const db = require("../db/connection");
const fs = require("fs/promises");

exports.selectTopics = async () => {
  const topicResponse = await db.query(`SELECT * FROM topics;`);
  return topicResponse.rows;
};

exports.fetchEndpoints = async () => {
  const readingEndpoints = await fs.readFile("./endpoints.json", "utf-8");
  const parsedEndpoints = JSON.parse(readingEndpoints);
  return parsedEndpoints;
};
