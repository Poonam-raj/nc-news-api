\c nc_news_test;
SELECT article.*, COUNT(comment.comment_id) AS comment_count FROM article 
LEFT JOIN comment ON comment.article_id = article.article_id
GROUP BY article.article_id;