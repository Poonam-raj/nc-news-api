exports.formatTimeStamp = (unix) => {
  const date = new Date(unix);
  return date;
};

//   belongs_to:
//     'The People Tracking Every Touch, Pass And Tackle in the World Cup',
//   created_by: 'tickle122',

// author VARCHAR REFERENCES "user"(username),
// article_id INT REFERENCES article(article_id),

exports.formatComment = (comment) => {
  return { ...comment };
};
