const request = require('supertest');
const seed = require('../db/seeds/seed');
const testData = require('../db/data/test-data/index');
const db = require('../db/connection');
const app = require('../app');

beforeEach(async () => {
  await seed(testData)}
);

afterAll(() => {
  db.end();
});

describe('GET /api/topics', () => {
  it('should respond with an object containing all topics ', () => {
    return request(app).get('/api/topics').expect(200)
        .then(({ body }) => {
        expect(body.topics).toHaveLength(3);
        expect(body.topics[0]).toEqual(expect.objectContaining({
            description: expect.any(String),
            slug: expect.any(String)
        }))
    });
  });
});
