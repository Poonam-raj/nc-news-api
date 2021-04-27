exports.formatTimeStamp = (unix) => {
  const date = new Date(unix);
  return date;
};

exports.formatCommentAuthor = (commentData) => {
  const copyOfCommentData = commentData.map((comment) => {
    const newComment = { ...comment, author: comment.created_by };
    delete newComment.created_by;
    return newComment;
  });
  return copyOfCommentData;
};

exports.createLookup = (articles) => {
  //this createLookup function could be changed to make it reusable;
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

exports.formatCommentArticleID = (commentData, lookup) => {
  const copyOfCommentData = commentData.map((comment) => {
    const newComment = { ...comment, article_id: lookup[comment.belongs_to] };
    delete newComment.belongs_to;
    return newComment;
  });
  return copyOfCommentData;
};
