exports.isMalformedBody = (key, body) => {
  const bodyKeys = Object.keys(body);
  if (typeof key !== "number" || bodyKeys.length > 1) {
    return Promise.reject({
      status: 400,
      msg: `Bad request: malformed body`,
    });
  }
};

exports.checkQuery = (sort_by, order) => {
  const acceptedColumns = [
    "author",
    "title",
    "article_id",
    "topic",
    "created_at",
    "votes",
    "comment_count",
  ];

  const acceptedOrders = ["desc", "asc"];

  if (!acceptedColumns.includes(sort_by)) {
    return Promise.reject({ status: 400, msg: `Bad Query: ${sort_by}` });
  } else if (!acceptedOrders.includes(order.toLowerCase())) {
    return Promise.reject({ status: 400, msg: `Bad Query: ${order}` });
  }
};

exports.formFetchArticleQueryStr = (sort_by, order, topic) => {
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

  return { queryStr, queryValues };
};
