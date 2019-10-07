const assert = require("chai").assert;
const vMachine = require("../algorithm/utility/vending_machineBL");

describe("vending_machine", function() {
  it("argument must be number", function() {
    result = vMachine(8563);
    assert.typeOf(result, "string");
  });
  it("argument should not be string", function() {
    result = vMachine("");
    assert.equal(result, "argument provided is not number or empty");
  });
  it("argument should not be string", function() {
    result = vMachine();
    assert.equal(result, "argument provided is not number or empty");
  });
  it("argument must be non-negative", function() {
    result = vMachine(-8796);
    assert.isBoolean(result, "amount shoud be positive");
  });
});
