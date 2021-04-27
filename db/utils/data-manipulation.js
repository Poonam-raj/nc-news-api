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

exports.createLookup = (articles) => {
  const finalLookup = {};
  articles.forEach(article => {
    const articleKeys = Object.keys(article);
    const articleValues = Object.values(article);
    let articleIdKey = 0;
    let articleTitleValue = '';
    articleKeys.forEach((key, i) => {
      if (key === 'article_id'){
         articleIdKey = articleValues[i];
      }
      if (key === 'title'){
        articleTitleValue = articleValues[i];
      }
    })
    finalLookup[articleIdKey]=articleTitleValue;
  })
  return finalLookup;
}

//this createLookup function could be changed to make it reusable;


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

//reference object???
// {
//   article_id: 36,
//   title: 'The vegan carnivore?',
//   body: 'The chef Richard McGeown has faced bigger culinary challenges in his distinguished career than frying a meat patty in a little sunflower oil and butter. But this time the eyes and cameras of hundreds of journalists in the room were fixed on the 5oz (140g) pink disc sizzling in his pan, one that had been five years and €250,000 in the making. This was the world’s first proper portion of cultured meat, a beef burger created by Mark Post, professor of physiology, and his team at Maastricht University in the Netherlands. Post (which rhymes with ‘lost’, not ‘ghost’) has been working on in vitro meat (IVM) since 2009. On 5 August this year he presented his cultured beef burger to the world as a ‘proof of concept’. Having shown that the technology works, Post believes that in a decade or so we could see commercial production of meat that has been grown in a lab rather than reared and slaughtered. The comforting illusion that supermarket trays of plastic-wrapped steaks are not pieces of dead animal might become a discomforting reality.',
//   votes: 0,
//   topic: 'cooking',
//   author: 'tickle122',
//   created_at: 2020-03-09T21:21:00.000Z
// }
