const assert = require("chai").assert;
const toBinary = require("../algorithm/utility/to_binaryBL");

describe("to_binary_conversion", function() {
  it("data-type of argument should be number", function() {
    result = toBinary(16);
    assert.typeOf(result, "string");
  });
  it("argument should not be string", function() {
    result = toBinary("16");
    assert.isBoolean(result, "argument passed is invalid");
  });
  it("number must be positive", function() {
    result = toBinary(-16);
    assert.equal(result, "number must be positive");
  });
  it("no argument passed", function() {
    result = toBinary();
    assert.isBoolean(result, "argument not passed");
  });
});
