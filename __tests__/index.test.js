const request = require('supertest');
const seed = require('../db/seeds/seed');
const testData = require('../db/data/test-data/index');
const db = require('../db/connection');
const app = require('../app');

beforeEach(async () => {
  await seed(testData);
});

afterAll(() => {
  db.end();
});

describe('General', () => {
  describe("routes that don't exist.", () => {
    it('status:404, and not found message', () => {
      return request(app)
        .get('/not-a-route-mate')
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe('Route Not Found');
        });
    });
  });
  describe('GET /api', () => {
    it('status:200, responds with a JSON object containing all available API endpoints.', () => {
      return request(app)
        .get('/api')
        .expect(200)
        .then(({ body }) => {
          expect(body.endpoints).toEqual(
            expect.objectContaining({
              'GET /api': expect.any(Object),
              'GET /api/topics': expect.any(Object),
              'GET /api/articles/:article_id': expect.any(Object),
              'PATCH /api/articles/:article_id': expect.any(Object),
              'GET /api/articles': expect.any(Object),
              'GET /api/articles/:article_id/comments': expect.any(Object),
              'POST /api/articles/:article_id/comments': expect.any(Object),
            }),
          );
        });
    });
  });
});

describe('topics', () => {
  describe('GET /api/topics', () => {
    it('status:200, should respond with an object containing all topics ', () => {
      return request(app)
        .get('/api/topics')
        .expect(200)
        .then(({ body }) => {
          expect(body.topics).toHaveLength(3);
          body.topics.forEach((topic) => {
            expect(topic).toEqual(
              expect.objectContaining({
                description: expect.any(String),
                slug: expect.any(String),
              }),
            );
          });
        });
    });
  });
});

describe('articles', () => {
  describe('GET /api/articles/:article_id', () => {
    it('status:200, responds with a specific article.', () => {
      return request(app)
        .get('/api/articles/1')
        .expect(200)
        .then(({ body }) => {
          expect(body.article).toEqual({
            article_id: 1,
            title: 'Living in the shadow of a great man',
            body: 'I find this existence challenging',
            votes: 100,
            topic: 'mitch',
            author: 'butter_bridge',
            created_at: '2020-07-09T20:11:00.000Z',
            comment_count: '11',
          });
        });
    });
    it('status:404, error when passed a non-existent article_id', () => {
      return request(app)
        .get('/api/articles/24')
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toEqual('Article with ID 24 not found.');
        });
    });
    it('status:400, error when passed an invalid ID.', () => {
      return request(app)
        .get('/api/articles/not-an-ID')
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toEqual('Invalid ID');
        });
    });
  });

  describe('PATCH /api/articles/:article_id', () => {
    it('status:200, patches the article with article_id specified with an updated vote count, returning the updated article.', () => {
      return request(app)
        .patch('/api/articles/1')
        .send({ inc_votes: -25 })
        .expect(200)
        .then(({ body }) => {
          expect(body.article).toEqual(
            expect.objectContaining({
              author: expect.any(String),
              title: expect.any(String),
              article_id: 1,
              body: expect.any(String),
              topic: expect.any(String),
              created_at: expect.any(String),
              votes: 75,
              comment_count: expect.any(String),
            }),
          );
        });
    });
    it('status:200, ignores extra properties.', () => {
      return request(app)
        .patch('/api/articles/1')
        .send({ inc_votes: -25, extraProp: false })
        .expect(200)
        .then(({ body }) => {
          expect(body.article).toEqual(
            expect.objectContaining({
              article_id: 1,
              votes: 75,
            }),
          );
        });
    });

    it('status:400, error when passed a value with incorrect type.', () => {
      return request(app)
        .patch('/api/articles/1')
        .send({ inc_votes: 'dog' })
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toEqual('Bad request: malformed body');
        });
    });
    it('status:400, error when missing inc_votes key.', () => {
      return request(app)
        .patch('/api/articles/1')
        .send({ dog: -25 })
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toEqual('Bad request: malformed body');
        });
    });

    it('status:404, error when passed an article id which does not exist in the database.', () => {
      return request(app)
        .patch('/api/articles/35')
        .send({ inc_votes: -25 })
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toEqual('Article with ID 35 not found.');
        });
    });
    it('status:400, error when passed an invalid ID.', () => {
      return request(app)
        .patch('/api/articles/is-dog')
        .send({ inc_votes: -25 })
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toEqual('Invalid ID');
        });
    });
  });

  describe('GET /api/articles', () => {
    it('status:200, responds with all articles, default sorting.', () => {
      return request(app)
        .get('/api/articles')
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
              }),
            );
            expect(article).not.toEqual(
              expect.objectContaining({
                body: expect.any(String),
              }),
            );
          });
          expect(body.articles).toBeSortedBy('created_at', {
            descending: true,
          });
        });
    });
    it('status:200, accepts a query of sort_by to sort by any valid column.', () => {
      return request(app)
        .get('/api/articles?sort_by=title')
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).toHaveLength(12);
          expect(body.articles).toBeSortedBy('title', {
            descending: true,
          });
        });
    });
    it('status:200, accepts a query of order.', () => {
      return request(app)
        .get('/api/articles?order=asc')
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).toHaveLength(12);
          expect(body.articles).toBeSortedBy('created_at');
        });
    });
    it('status:200, accepts a query of topic to filter by topic.', () => {
      return request(app)
        .get('/api/articles?topic=cats')
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).toHaveLength(1);
          expect(body.articles).toBeSortedBy('created_at', {
            descending: true,
          });
        });
    });
    it('status:200, accepts a query of topic, sort_by and order together.', () => {
      return request(app)
        .get('/api/articles?topic=mitch&sort_by=author&order=asc')
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).toHaveLength(11);
          expect(body.articles).toBeSortedBy('author');
        });
    });
    it("status:400, error when 'sort_by' column does not exist.", () => {
      return request(app)
        .get('/api/articles?sort_by=dog')
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe('Bad Query: dog');
        });
    });
    it('status:400, error when "order" is not defined as "asc" or "desc"', () => {
      return request(app)
        .get('/api/articles?order=cat')
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe('Bad Query: cat');
        });
    });
    it('status:404, error when "topic" is not in database.', () => {
      return request(app)
        .get('/api/articles?topic=network')
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe('Topic Not Found');
        });
    });
    it('status:200, responds with empty array when "topic" is existing but has no articles associated with it.', () => {
      return request(app)
        .get('/api/articles?topic=paper')
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).toEqual([]);
        });
    });
  });

  describe('GET /api/articles/:article_id/comments', () => {
    it('status:200, responds with an array of comments for a given article_id', () => {
      const path = '/api/articles/1/comments';
      return request(app)
        .get(path)
        .expect(200)
        .then(({ body }) => {
          body.comments.forEach(() => {
            expect.objectContaining({
              comment_id: expect.any(Number),
              votes: expect.any(Number),
              created_at: expect.any(String),
              author: expect.any(String),
              body: expect.any(String),
            });
          });

          expect(body.comments).toBeSortedBy('created_at', {
            descending: true,
          });
        });
    });

    it('status:404, error when passed a non-existant article id.', () => {
      return request(app)
        .get('/api/articles/24/comments')
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toEqual('Article with ID 24 not found.');
        });
    });
    it('status:400, error when passed an invalid ID.', () => {
      return request(app)
        .get('/api/articles/not-an-ID/comments')
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toEqual('Invalid ID');
        });
    });
    it('status:200, responds with empty array when passed a valid article_id with no comments associated with it.', () => {
      const path = '/api/articles/4/comments';
      return request(app)
        .get(path)
        .expect(200)
        .then(({ body }) => {
          expect(body.comments).toEqual([]);
        });
    });
  });

  describe('POST /api/articles/:article_id/comments', () => {
    it('status:201, posts a given comment and responds with the posted comment.', () => {
      const path = '/api/articles/8/comments';
      return request(app)
        .post(path)
        .send({ username: 'lurker', body: 'this is my comment' })
        .expect(201)
        .then(({ body }) => {
          expect(body.comment).toEqual(
            expect.objectContaining({
              comment_id: expect.any(Number),
              article_id: 8,
              votes: expect.any(Number),
              created_at: expect.any(String),
              author: 'lurker',
              body: 'this is my comment',
            }),
          );
        });
    });
    it('status:201, ignores extra properties.', () => {
      const path = '/api/articles/8/comments';
      return request(app)
        .post(path)
        .send({
          username: 'lurker',
          body: 'this is my comment',
          thisIsExtra: 1000,
        })
        .expect(201)
        .then(({ body }) => {
          expect(body.comment).toEqual(
            expect.objectContaining({
              article_id: 8,
              author: 'lurker',
              body: 'this is my comment',
            }),
          );
        });
    });
    it('status:404, error when passed a article id which does not exist in the database.', () => {
      return request(app)
        .post('/api/articles/24/comments')
        .send({ username: 'lurker', body: 'this is definitely not my comment' })
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toEqual('Article_id not found.');
        });
    });
    it('status:400, error when passed an invalid ID.', () => {
      return request(app)
        .post('/api/articles/not-an-ID/comments')
        .send({ username: 'rogersop', body: 'this is my type of article' })
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toEqual('Invalid ID');
        });
    });

    it('status:400, error when passed an empty body.', () => {
      return request(app)
        .post('/api/articles/8/comments')
        .send({})
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toEqual('Bad request: malformed body');
        });
    });

    it('status:400, error when passed a value with incorrect type.', () => {
      return request(app)
        .post('/api/articles/8/comments')
        .send({ username: 'lurker', body: 32 })
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toEqual('Bad request: malformed body');
        });
    });
    it('status:400, error when passed an incorrect key.', () => {
      return request(app)
        .post('/api/articles/8/comments')
        .send({ dog: 'lurker', body: 'this is my comment' })
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toEqual('Bad request: malformed body');
        });
    });
  });
});

describe('users', () => {
  describe('GET /api/users', () => {
    test('200: responds with all users', () => {
      return request(app)
        .get('/api/users')
        .expect(200)
        .then(({ body: { users } }) => {
          expect(users.length).toBe(4);
          users.forEach((user) => {
            expect(user).toMatchObject({
              username: expect.any(String),
              name: expect.any(String),
              avatar_url: expect.any(String),
            });
          });
        });
    });
  });
  describe('GET /api/users/:username', () => {
    it('200: responds with a user of given username', () => {
      return request(app)
        .get('/api/users/butter_bridge')
        .expect(200)
        .then(({ body: { user } }) => {
          expect(user).toMatchObject({
            username: 'butter_bridge',
            name: 'jonny',
            avatar_url:
              'https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg',
          });
        });
    });
    it('404: error when passed a valid but not found username', () => {
      return request(app)
        .get('/api/users/not_a_user')
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toEqual('invalid username');
        });
    });
  });
});
describe('comments', () => {
  describe('DELETE /api/comments/:comment_id', () => {
    it('204: deletes specified comment', () => {
      return request(app).delete('/api/comments/2').expect(204);
    });
    it('404: error when passed a valid ID that is missing in the db', () => {
      return request(app)
        .delete('/api/comments/10000')
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe('Comment with id 10000 does not exist');
        });
    });
    it('400: error when passed invalid id', () => {
      return request(app)
        .delete('/api/comments/badId')
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe('Invalid ID');
        });
    });
  });
  describe('PATCH /api/comments/:comment_id', () => {
    it('status:200, patches the comment with an updated vote count, returning the updated comment.', () => {
      return request(app)
        .patch('/api/comments/1')
        .send({ inc_votes: 4 })
        .expect(200)
        .then(({ body }) => {
          expect(body.comment).toEqual(
            expect.objectContaining({
              comment_id: 1,
              body: expect.any(String),
              belongs_to: expect.any(String),
              created_by: expect.any(String),
              votes: 20,
              created_at: expect.any(String),
            }),
          );
        });
    });
    xit('status:200, ignores extra properties.', () => {
      return request(app)
        .patch('/api/comments/1')
        .send({ inc_votes: -25, extraProp: false })
        .expect(200)
        .then(({ body }) => {
          expect(body.comment).toEqual(
            expect.objectContaining({
              comment_id: 1,
              body: expect.any(String),
              belongs_to: expect.any(String),
              created_by: expect.any(String),
              votes: -9,
              created_at: expect.any(String),
            }),
          );
        });
    });

    xit('status:400, error when passed a value with incorrect type.', () => {
      return request(app)
        .patch('/api/comments/1')
        .send({ inc_votes: 'dog' })
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toEqual('Bad request: malformed body');
        });
    });
    xit('status:400, error when missing inc_votes key.', () => {
      return request(app)
        .patch('/api/comments/1')
        .send({ dog: -25 })
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toEqual('Bad request: malformed body');
        });
    });

    xit('status:404, error when passed an article id which does not exist in the database.', () => {
      return request(app)
        .patch('/api/comments/99999')
        .send({ inc_votes: -25 })
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toEqual('Comment with ID 99999 not found.');
        });
    });
    xit('status:400, error when passed an invalid ID.', () => {
      return request(app)
        .patch('/api/comments/notAnId')
        .send({ inc_votes: -25 })
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toEqual('Invalid ID');
        });
    });
  });
});
