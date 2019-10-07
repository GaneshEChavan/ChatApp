const assert = require("chai").assert;
const bSearch = require("../algorithm/utility/binary_searchBL");

describe("binary_search", function() {
  it("start index is non-negative & greater than end index", function() {
    let result = bSearch(5, 3, 2, []);
    assert.equal(
      result,
      "start index must non-negative and less than end index"
    );
  });
  it("start index should not null", function() {
    let result = bSearch(3, 2, []);
    assert.equal(
      result,
      "start index must non-negative and less than end index"
    );
  });
  it("should pass all arguments", function() {
    let result = bSearch();
    assert.isBoolean(result, "no all arguments provided");
  });
  it("output", function() {
    let arr = [1, 2, 3, 4];
    let start = 0;
    let end = arr.length - 1;
    let check = 2;
    let result = bSearch(start, end, check, arr);
    assert.typeOf(result, "string");
  });
});
