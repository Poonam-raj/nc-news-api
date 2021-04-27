exports.formatTimeStamp = (unix) => {
  const date = new Date(unix);
  return date;
};
//current:
//   belongs_to:
//     'The People Tracking Every Touch, Pass And Tackle in the World Cup',

//new:
// article_id INT REFERENCES article(article_id),

exports.formatCommentAuthor = (comment) => {
  const newComment = { ...comment, author: comment.created_by };
  delete newComment.created_by;
  return newComment;
};

exports.formatCommentArticleID = (comment) => {
  /*Need to look at current value of 'belongs_to'.
  loop through articles table
   Find article "title" that === 'belongs_to' 
   Take relevant "article_id" and assign it to a new key of "article_id" in the comment object
   Delete "belongs_to"
   */
  const newComment = { ...comment };
  return newComment;
};

//currently functions take whole comment, but in seed we apply it just to the key value in comment map...
//change how we set up seed? (taking whole comment data first, then manipulating, then inserting into treasures)
//Or change function and make it more specific?
