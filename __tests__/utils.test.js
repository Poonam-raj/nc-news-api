const {
  formatTimeStamp,
  formatCommentAuthor,
  formatCommentArticleID,
  createLookup,
} = require('../db/utils/data-manipulation');
const { isMalformedBody } = require('../models/utils');

describe('formatTimeStamp', () => {
  it('returns a date object.', () => {
    expect(typeof formatTimeStamp(1594329060000)).toBe('object');
  });

  it("converts unix timestamp to 'DD/MM/YYYY hh:mm:ss' format.", () => {
    const unix = 1594329060000;
    expect(formatTimeStamp(unix)).toEqual(new Date(1594329060000));
  });
  it('does not mutate the original input', () => {
    const unix = 1594329060000;
    expect(formatTimeStamp(unix)).toEqual(new Date(1594329060000));
    expect(unix).toEqual(1594329060000);
  });
});

describe('formatCommentAuthor', () => {
  it('should return an array', () => {
    expect(typeof formatCommentAuthor([{}])).toBe('object');
  });
  it('should return an object that has a different reference to the original object passed in, and does not mutate original input.', () => {
    const input = [
      {
        body: 'Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.',
        created_by: 'tickle122',
        votes: -1,
        created_at: 1590103140000,
      },
    ];
    expect(formatCommentAuthor(input)).not.toBe(input);
    expect(input).toEqual([
      {
        body: 'Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.',
        created_by: 'tickle122',
        votes: -1,
        created_at: 1590103140000,
      },
    ]);
  });
  it('should return an object with author key instead of created_by key', () => {
    const input = [
      {
        body: 'Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.',
        created_by: 'tickle122',
        belongs_to: "They're not exactly dogs, are they?",
        votes: -1,
        created_at: 1590103140000,
      },
    ];
    expect(formatCommentAuthor(input)).toEqual([
      {
        body: 'Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.',
        author: 'tickle122',
        belongs_to: "They're not exactly dogs, are they?",
        votes: -1,
        created_at: 1590103140000,
      },
    ]);
  });
});

describe('createLookup', () => {
  it('should return an object ', () => {
    const input = [];
    expect(typeof createLookup(input)).toBe('object');
  });
  it('the object returned should contain a key of a "title" with its corresponding "article_id" as the value when passed an array of one article object', () => {
    const input = [
      {
        article_id: 36,
        title: 'The vegan carnivore?',
        body: 'The chef Richard McGeown has faced...',
        votes: 0,
        topic: 'cooking',
        author: 'tickle122',
      },
    ];
    expect(createLookup(input)).toEqual({ 'The vegan carnivore?': 36 });
  });
  it('should work for arrays containing multiple objects', () => {
    const input = [
      {
        title: 'Living in the shadow of a great man',
        topic: 'mitch',
        author: 'butter_bridge',
        body: 'I find this existence challenging',
        created_at: 1594329060000,
        votes: 100,
        article_id: 1,
      },
      {
        title: 'Sony Vaio; or, The Laptop',
        topic: 'mitch',
        author: 'icellusedkars',
        body: 'Call me Mitchell...',
        created_at: 1602828180000,
        article_id: 2,
      },
    ];
    expect(createLookup(input)).toEqual({
      'Living in the shadow of a great man': 1,
      'Sony Vaio; or, The Laptop': 2,
    });
  });
  it('no mutation of original input', () => {
    const input = [
      {
        article_id: 36,
        title: 'The vegan carnivore?',
        body: 'The chef Richard McGeown has faced...',
        votes: 0,
        topic: 'cooking',
        author: 'tickle122',
      },
    ];
    expect(createLookup(input)).toEqual({ 'The vegan carnivore?': 36 });
    expect(input).toEqual([
      {
        article_id: 36,
        title: 'The vegan carnivore?',
        body: 'The chef Richard McGeown has faced...',
        votes: 0,
        topic: 'cooking',
        author: 'tickle122',
      },
    ]);
  });
});

describe('formatCommentArticleID', () => {
  it('should return an array', () => {
    expect(Array.isArray(formatCommentArticleID([{}], {}))).toBe(true);
  });
  it('should return an object that has a different reference to the original object passed in, and does not mutate original input.', () => {
    const input = [
      {
        body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        belongs_to: "They're not exactly dogs, are they?",
        created_by: 'butter_bridge',
        votes: 16,
        created_at: 1586179020000,
      },
    ];
    expect(formatCommentArticleID(input, {})).not.toBe(input);
    expect(input).toEqual([
      {
        body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        belongs_to: "They're not exactly dogs, are they?",
        created_by: 'butter_bridge',
        votes: 16,
        created_at: 1586179020000,
      },
    ]);
  });
  it('should return an array containing an object with key of "article_id" with value of id, instead of "belongs_to" key and value, when passed an array of objects and a lookup.', () => {
    const input = [
      {
        body: 'Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.',
        created_by: 'tickle122',
        belongs_to: "They're not exactly dogs, are they?",
        votes: -1,
        created_at: 1590103140000,
      },
    ];

    const lookup = { "They're not exactly dogs, are they?": 1 };
    expect(formatCommentArticleID(input, lookup)[0]).toEqual(
      expect.objectContaining({
        body: expect.any(String),
        created_by: expect.any(String),
        article_id: expect.any(Number),
        votes: expect.any(Number),
        created_at: expect.any(Number),
      }),
    );
    expect(formatCommentArticleID(input, lookup)[0]).toEqual(
      expect.not.objectContaining({
        belongs_to: expect.any(String),
      }),
    );
  });
});

describe('isMalformedBody', () => {
  it('returns false when passed nothing', () => {
    expect(isMalformedBody()).toBe(false);
  });
  it('returns true when missing a property.', () => {
    expect(
      isMalformedBody(
        { a: 'number', b: 'number', c: 'number' },
        { a: 1, b: 2 },
      ),
    ).toBe(true);
    expect(
      isMalformedBody(
        { a: 'number', b: 'string', c: 'number' },
        { a: 1, b: 'dog', d: 4 },
      ),
    ).toBe(true);
  });
  it('returns false when passed an object of expected keys with expected datatype which are solely present in the body.', () => {
    expect(
      isMalformedBody(
        { a: 'number', b: 'number', c: 'number' },
        { a: 1, b: 2, c: 3 },
      ),
    ).toBe(false);
  });
  it('returns true when passed a body with incorrect type of information', () => {
    expect(
      isMalformedBody(
        { a: 'number', b: 'number', c: 'number' },
        { a: 1, b: 2, c: false },
      ),
    ).toBe(true);
  });
  it('ignores extra properties in passed obj', () => {
    expect(
      isMalformedBody(
        { a: 'number', b: 'number', c: 'number' },
        { a: 1, b: 2, c: 3, extraKey: 100 },
      ),
    ).toBe(false);
  });
});
