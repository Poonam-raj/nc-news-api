exports.formatTimeStamp = (unix) => {
  const date = new Date(unix);
  return date;
};

exports.formatCommentAuthor = (comment) => {
  const newComment = { ...comment, author: comment.created_by };
  //take out spread -> possible error because of spreading a single item
  delete newComment.created_by;
  return newComment;
};

exports.createLookup = (articles) => {
  const finalLookup = {};
  articles.forEach((article) => {
    const articleKeys = Object.keys(article);
    const articleValues = Object.values(article);
    let articleId = 0;
    let articleTitle = "";
    articleKeys.forEach((key, i) => {
      if (key === "article_id") {
        articleId = articleValues[i];
      }
      if (key === "title") {
        articleTitle = articleValues[i];
      }
    });
    finalLookup[articleTitle] = articleId;
  });
  return finalLookup;
};
//{'36': 'The vegan carnivore?'}
//make title the key, id the value

//this createLookup function could be changed to make it reusable;

exports.formatCommentArticleID = (comment) => {
  /* Take relevant "article_id" and assign it to a new key of "article_id" in the comment object
   Delete "belongs_to"
   */
  const newComment = { ...comment };
  return newComment;
};

//currently functions take whole comment, but in seed we apply it just to the key value in comment map...
//change how we set up seed? (taking whole comment data first, then manipulating, then inserting into treasures)
//Or change function and make it more specific?

//reference object???
