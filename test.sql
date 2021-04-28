\c nc_news_test;
UPDATE article SET 
  votes = votes + -15 WHERE article_id=2 RETURNING *;