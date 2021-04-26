const db = require('../connection');
const { createTables, dropTables } = require('../seeds/manage-tables');
const format = require('pg-format');


const seed = async({articleData, topicData, userData, commentData}) => {
  await dropTables();
  await createTables();
  const insertTopicsQueryString = format(`INSERT INTO topics (slug, description) VALUES %L RETURNING *;`, topicData.map(({description, slug}) => [description, slug]));
  const insertingTopics = await db.query(insertTopicsQueryString);
  console.log(insertingTopics);
};

seed();

  // add seeding functionality here
  // this function should take as argument(s) all the data it needs to seed
  // it should insert this data into the relevant tables in your database