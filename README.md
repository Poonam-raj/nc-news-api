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

This API is hosted on Render and can be found here: [https://nc-news-m9jy.onrender.com/api/](https://nc-news-m9jy.onrender.com/api/)

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

#### .env.production

Make the third file called `.env.production`. For this file you will need the URL of the ElephantSQL server instance.

It should only contain the following:

```bash
DATABASE_URL=<URL>
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

## Running the api locally

If you want to run this express app locally on your computer you will need to seed the dev database and start the app

### Seed local database

If you want to seed the local dev database run the command:

```bash
npm run seed
```

### Start the app

The following command will start the express app locally:

```bash
npm run start
```

## Re-seeding the production database

If the deployed app needs to be re-seeded (if the data is being muddied or any other reason - PLEASE TAKE CARE RE_SEEDING ONLY IF NEED BE) run:

```bash
npm run seed-prod
```
