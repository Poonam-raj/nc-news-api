const db = require('../db/connection');

exports.isMalformedBody = (expectedKeysObj, body) => {
  if (!expectedKeysObj || !body) {
    return false;
  }
  const bodyKeys = Object.keys(body);
  const expectedKeys = Object.keys(expectedKeysObj);
  const keysArrLength = expectedKeys.length;
  let count = 0;

  expectedKeys.forEach((key) => {
    bodyKeys.forEach((bodyKey) => {
      if (key === bodyKey && typeof body[key] === expectedKeysObj[key]) {
        count++;
      }
    });
  });

  if (keysArrLength !== count) {
    return true;
  }
  return false;
};

exports.checkQuery = async (sort_by, order) => {
  const acceptedColumns = [
    'author',
    'title',
    'article_id',
    'topic',
    'created_at',
    'votes',
    'comment_count',
  ];

  const acceptedOrders = ['desc', 'asc'];

  if (!acceptedColumns.includes(sort_by)) {
    return Promise.reject({ status: 400, msg: `Bad Query: ${sort_by}` });
  } else if (!acceptedOrders.includes(order.toLowerCase())) {
    return Promise.reject({ status: 400, msg: `Bad Query: ${order}` });
  }
};

exports.formFetchArticleQueryStr = async (sort_by, order, topic) => {
  let queryStr = `
  SELECT articles.author, title, articles.article_id, topic, articles.created_at, articles.votes, COUNT(comments.comment_id) AS comment_count 
  FROM articles 
  LEFT JOIN comments ON articles.article_id = comments.article_id`;
  const queryValues = [];

  if (topic) {
    const existingTopics = await db.query(
      `SELECT slug FROM topics WHERE slug = $1;`,
      [topic],
    );
    if (existingTopics.rowCount === 0) {
      return Promise.reject({ status: 404, msg: 'Topic Not Found' });
    }

    queryStr += ` WHERE topic = $1`;
    queryValues.push(topic);
  }
  queryStr += ` GROUP BY articles.article_id
  ORDER BY ${sort_by} ${order};`;

  return { queryStr, queryValues };
};

exports.checkArticleID = async (articleID) => {
  const isValidArticleID = await db.query(
    `SELECT * FROM articles WHERE article_id = $1;`,
    [articleID],
  );
  if (isValidArticleID.rowCount === 0) {
    return Promise.reject({
      status: 404,
      msg: `Article with ID ${articleID} not found.`,
    });
  }
};
