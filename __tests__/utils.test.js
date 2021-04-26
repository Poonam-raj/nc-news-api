const {
  formatTimeStamp,
  formatComment,
} = require('../db/utils/data-manipulation');

describe('formatTimeStamp', () => {
  it('returns a date object.', () => {
    expect(typeof formatTimeStamp(1594329060000)).toBe('object');
  });

  it("converts unix timestamp to 'DD/MM/YYYY hh:mm:ss' format.", () => {
    const unix = 1594329060000;
    //const expected = 2020-07-09T21:11:00.000Z;

    expect(formatTimeStamp(unix)).toBe('2020-07-09T21:11:00.000Z');
  });
});

//second test is not passing as the format does not match expected

describe.only('formatComment', () => {
  it('should return an object', () => {
    expect(typeof formatComment({})).toBe('object');
  });
  it('should return an object that has a different reference to the original object passed in', () => {
    const input = {};
    expect(formatComment(input)).not.toBe(input);
  });
  it('should return an object with author key instead of created_by key', () => {
    const input = {
      body:
        'Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.',
      created_by: 'tickle122',
      votes: -1,
      created_at: 1590103140000,
    };
    expect(formatComment(input)).toEqual({
      body:
        'Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.',
      author: 'tickle122',
      votes: -1,
      created_at: 1590103140000,
    });
    //need to work on function to pass the above test
    //one more test required to check if belongs_to has been changed to article id and it's value is changed to id
  });
});
