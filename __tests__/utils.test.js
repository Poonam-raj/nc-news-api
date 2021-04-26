const { formatTimeStamp } = require("../db/utils/data-manipulation");

describe("formatTimeStamp", () => {
  it("returns a string.", () => {
    expect(typeof formatTimeStamp(1594329060000)).toBe("string");
  });

  it("converts unix timestamp to 'DD/MM/YYYY hh:mm:ss' format.", () => {
    const unix = 1594329060000;
    const expected = "09/07/2020, 22:11:00";

    expect(formatTimeStamp(unix)).toBe(expected);
  });
});
