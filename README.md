# Northcoders News API

## Background

The Northcoders News API holds a range of news articles all categorised by topic, with comments and a votes score associated with the articles too. The articles have the following keys associated with them:

- `article_id`
- `title`
- `body`
- `votes`
- `topic`
- `author`
- `created_at`
- `comment_count`

You can get all the articles, all topics, an article by ID and comments by article ID. You can also patch an article's vote count or post a new comment to an article.

## Hosted App

This API is hosted on Heroku and can be found here: [https://poonam-nc-news.herokuapp.com/](https://poonam-nc-news.herokuapp.com/)

## Min Node and Postgres versions

The minimum version of Node required: <b>7.4.0</b>

The minimum version of Postgres required: <b> 7.4.0</b>

## Set Up the Repo

### 1. Clone the Repo

In terminal:

```bash
git clone https://github.com/Poonam-raj/be-nc-news.git
```

### 2. Install Dependencies

In terminal:

```bash
npm install
```

### 3. Add .env files

Make two files in the root directory of this repo.

#### .env.test

Make the first file called `.env.test`. It should only contain the following:

```bash
PGDATABASE=nc_news_test
```

#### .env.development

Make the second file called `.env.development`. It should only contain the following:

```bash
PGDATABASE=nc_news
```

### 4. Set Up Databases

Run the following script to create our databases:

```bash
npm run setup-dbs
```

### 5. Run Test

Run the test file:

```bash
npm test
```

And to run all tests follow this command with:

```bash
a
```

to run all the tests in the file.
