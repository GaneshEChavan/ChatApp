const assert = require("chai").assert;
const twoDArray = require("../functional/utility/2D_arrayBL");

describe("2D_array", function() {
  it("output is in string", function() {
    result = twoDArray(2, 2);
    assert.typeOf(result, "string");
  });
  it("arguments not be string", function() {
    result = twoDArray("2", 2);
    assert.isBoolean(result, "input provided are invalid");
  });
  it("arguments must positive", function() {
    result = twoDArray(2, -2);
    assert.equal(result, "inputs must positive");
  });
  it("arguments not be within array", function() {
    result = twoDArray([2, 2]);
    assert.isBoolean(result, "inputs must positive");
  });
});
