const assert = require("chai").assert;
const addToZero = require("../functional/utility/int_add_to_zeroBL");

describe("int_add_to_zero", function() {
  it("output in string", function() {
    result = addToZero([1, -1, -2, 3, 1]);
    assert.typeOf(result, "string");
  });
  it("argument must not be string", function() {
    result = addToZero(1, -1, -2, "3", 1);
    assert.isBoolean(result, "must provide number array");
  });
  it("arguments must provide", function() {
    result = addToZero();
    assert.isBoolean(result, "arg is not provided");
  });
  it("all arguments must numbers", function() {
    result = addToZero(parseInt({}), -1, -2, 3, 1);
    assert.isBoolean(result, "must provide number array");
  });
});
