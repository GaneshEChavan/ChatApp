const assert = require("chai").assert;
const leap = require("../functional/utility/leap_yearBL");

describe("leap_year", function() {
  it("data-type of argument should be number", function() {
    result = leap(2016);
    assert.typeOf(result, "string");
  });
  it("argument should not be string", function() {
    result = leap("2016");
    assert.isBoolean(result, "argument passed is invalid");
  });
  it("number must be positive", function() {
    result = leap(-2016);
    assert.equal(result, "number must be positive");
  });
  it("no argument passed", function() {
    result = leap();
    assert.isBoolean(result, "argument not passed");
  });
});
