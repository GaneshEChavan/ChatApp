const assert = require("chai").assert;
const day = require("../algorithm/utility/day_of_weekBL");

describe("day_of_week", function() {
  it("result is an array", function() {
    result = day(7, 5, 1995);
    assert.isArray(result, "passed...!");
  });
  it("arg must be numbers", function() {
    result = day(7, "5", 1995);
    assert.isBoolean(result, "invalid inputs");
  });
  it("day or month should be existing", function() {
    result = day(35, 13, 1995);
    assert.equal(result, "Invalid inputs");
  });
  it("values must be positive", function() {
    result = day(31, 11, -1995);
    assert.equal(result, "values must be non-negative");
  });
});
