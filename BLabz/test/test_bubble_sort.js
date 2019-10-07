let assert = require("chai").assert;
let bubble = require("../algorithm/utility/bubble_sortBL");

describe("bubble_sort", function() {
  it("argument passed should be array", function() {
    result = bubble([]);
    assert.isArray(result, "sorted the array");
  });
  it("argument will not be string", function() {
    result = bubble("");
    assert.isBoolean(result, "must pass array");
  });
  it("argument will not be numbers", function() {
    result = bubble(5, 9, 2);
    assert.isBoolean(result, "must pass array");
  });
  it("argument passed should be array", function() {
    result = bubble([]);
    assert.isNotNull(result, "sorted the array");
  });
  it("argument should not be empty", function() {
    result = bubble();
    assert.isBoolean(result, "must pass argument");
  });
});
