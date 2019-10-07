let assert = require("chai").assert;
let insertion = require("../algorithm/utility/insertion_sortBL");

describe("insertion_sort", function() {
  it("argument passed should be array", function() {
    result = insertion([]);
    assert.isArray(result, "sorted the array");
  });
  it("argument will not be string", function() {
    result = insertion("");
    assert.isBoolean(result, "must pass array");
  });
  it("argument will not be numbers", function() {
    result = insertion(5, 9, 2);
    assert.isBoolean(result, "must pass array");
  });
  it("argument passed should be array", function() {
    result = insertion([]);
    assert.isNotNull(result, "sorted the array");
  });
  it("argument should not be empty", function() {
    result = insertion();
    assert.isBoolean(result, "must pass argument");
  });
});
