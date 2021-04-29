const request = require("supertest");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data/index");
const db = require("../db/connection");
const app = require("../app");

beforeEach(async () => {
  await seed(testData);
});

afterAll(() => {
  db.end();
});

describe("GET /api/topics", () => {
  it("status:200, should respond with an object containing all topics ", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        expect(body.topics).toHaveLength(3);
        body.topics.forEach((topic) => {
          expect(topic).toEqual(
            expect.objectContaining({
              description: expect.any(String),
              slug: expect.any(String),
            })
          );
        });
      });
  });
});

describe("GET /api/articles/:article_id", () => {
  it("status:200, responds with a specific article object based on article_id in the route.", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then(({ body }) => {
        expect(body.article).toHaveLength(1);
        expect(body.article[0]).toEqual(
          expect.objectContaining({
            author: expect.any(String),
            title: expect.any(String),
            article_id: expect.any(Number),
            body: expect.any(String),
            topic: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            comment_count: expect.any(String),
          })
        );
      });
  });
  it("status:404, responds with a 404 error when passed a article id which does not exist in the database.", () => {
    return request(app)
      .get("/api/articles/24")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toEqual("Article_id: 24 is invalid.");
      });
  });
  it("status:400, responds with a 400 error when passed an invalid ID.", () => {
    return request(app)
      .get("/api/articles/not-an-ID")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toEqual("Invalid ID");
      });
  });
});

describe("PATCH /api/articles/:article_id", () => {
  it("status:200, patches the article with article_id specified with an updated vote count, returning the updated article.", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({ inc_votes: -25 })
      .expect(200)
      .then(({ body }) => {
        expect(body.updatedArticle).toHaveLength(1);
        expect(body.updatedArticle[0]).toEqual(
          expect.objectContaining({
            author: expect.any(String),
            title: expect.any(String),
            article_id: expect.any(Number),
            body: expect.any(String),
            topic: expect.any(String),
            created_at: expect.any(String),
            votes: 75,
            comment_count: expect.any(String),
          })
        );
      });
  });

  it("status:400, responds with a Bad Request error message when passed a malformed body.", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({})
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toEqual("Bad request: malformed body");
      });
  });

  it("status:400, responds with a Bad Request error message when passed a value with incorrect type.", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({ inc_votes: "dog" })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toEqual("Bad request: malformed body");
      });
  });
  it("status:400, responds with a Bad Request error message when passed an incorrect key.", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({ dog: -25 })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toEqual("Bad request: malformed body");
      });
  });

  it("status:400, responds with Bad Request error when passed some other property on request body.", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({ inc_votes: 1, name: "Mitch" })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toEqual("Bad request: malformed body");
      });
  });

  it("status:404, responds with a 404 error when passed an article id which does not exist in the database.", () => {
    return request(app)
      .patch("/api/articles/35")
      .send({ inc_votes: -25 })
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toEqual("Article_id: 35 is invalid.");
      });
  });
  it("status:400, responds with a 400 error when passed an invalid ID.", () => {
    return request(app)
      .patch("/api/articles/is-dog")
      .send({ inc_votes: -25 })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toEqual("Invalid ID");
      });
  });
});

describe("GET /api/articles", () => {
  it("status:200, responds with an array of article objects, default sort order is by date descending.", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).toHaveLength(12);
        body.articles.forEach((article) => {
          expect(article).toEqual(
            expect.objectContaining({
              author: expect.any(String),
              title: expect.any(String),
              article_id: expect.any(Number),
              topic: expect.any(String),
              created_at: expect.any(String),
              votes: expect.any(Number),
              comment_count: expect.any(String),
            })
          );
          expect(article).not.toEqual(
            expect.objectContaining({
              body: expect.any(String),
            })
          );
        });
        expect(body.articles).toBeSortedBy("created_at", {
          descending: true,
        });
      });
  });

  it("status:200, should accept a query including a sort_by parameter to sort by any valid column (default order Desc).", () => {
    return request(app)
      .get("/api/articles?sort_by=title")
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).toHaveLength(12);
        expect(body.articles).toBeSortedBy("title", {
          descending: true,
        });
      });
  });
  it("status:200, should accept a query including a order parameter to alter order of sort to ascending.", () => {
    return request(app)
      .get("/api/articles?order=asc")
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).toHaveLength(12);
        expect(body.articles).toBeSortedBy("created_at");
      });
  });
  it("status:200, should accept a query including a topic parameter to filter results by topic slug.", () => {
    return request(app)
      .get("/api/articles?topic=cats")
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).toHaveLength(1);
        expect(body.articles).toBeSortedBy("created_at", {
          descending: true,
        });
      });
  });

  it("status:200, should accept a query including a topic, sort_by and order parameter to filter results by topic slug in a specific sort order.", () => {
    return request(app)
      .get("/api/articles?topic=mitch&sort_by=author&order=asc")
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).toHaveLength(11);
        expect(body.articles).toBeSortedBy("author");
      });
  });

  it("status:400, responds with error when sort_by column does not exist.", () => {
    return request(app)
      .get("/api/articles?sort_by=dog")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Query");
      });
  });

  /*400:  column doesn't exist
  400: order isn't asc or desc
  404: author or topic is not in database
  200: author or topic exists but does not have any articles associated with it
  */
});
