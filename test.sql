\c nc_news_test;
SELECT topic.*, COUNT(article.article_id) AS article_count FROM topic 
    LEFT JOIN article ON article.topic = topic.slug
    GROUP BY topic.slug;

