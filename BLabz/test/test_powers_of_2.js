const assert = require("chai").assert;
const powOf2 = require("../functional/utility/powers_of_2BL");

describe("leap_year", function() {
  it("data-type of argument should be number", function() {
    result = powOf2(10);
    assert.typeOf(result, "string");
  });
  it("argument should not be string", function() {
    result = powOf2("10");
    assert.isBoolean(result, "argument passed is invalid");
  });
  it("number must be positive", function() {
    result = powOf2(-10);
    assert.equal(result, "number must be positive");
  });
  it("no argument passed", function() {
    result = powOf2();
    assert.isBoolean(result, "argument not passed");
  });
});
