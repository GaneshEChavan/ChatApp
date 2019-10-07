const assert = require("chai").assert;
const distance = require("../functional/utility/euclidianBL");

describe("euclidian_distance", function() {
  it("output in text", function() {
    result = distance(1, 2, 3, 4);
    assert.typeOf(result, "string");
  });
  it("any arguments must not be string", function() {
    result = distance(1, "2", 3, 4);
    assert.isBoolean(result, "arg is in string or not provided");
  });
  it("arguments must provide", function() {
    result = distance();
    assert.isBoolean(result, "arg is in string or not provided");
  });
  it("all arguments must provide", function() {
    result = distance(1, 2, 3, -4);
    assert.equal(result, "give positive values only");
  });
  it("all arguments must numbers", function() {
    result = distance(parseInt({}), parseInt([]), parseInt(""), parseInt("l"));
    assert.equal(result, "not a number");
  });
});
