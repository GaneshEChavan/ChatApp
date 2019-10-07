const assert = require("chai").assert;
const test = require("../functional/utility/coin_tossBL");

describe("coin_toss", function() {
  it("output", function() {
    result = test(14);
    assert.typeOf(result, "number");
  });
  it("arguments must be number", function() {
    result = test("");
    assert.isBoolean(result, "input is not number");
  });
  it("arguments must be provided", function() {
    result = test();
    assert.isBoolean(result, "input is not given");
  });
  it("arguments must be provided", function() {
    result = test(-5);
    assert.equal(result, "failed");
  });
  it("arguments not be object", function() {
    result = test([]);
    assert.isBoolean(result, "argument is object");
  });
});
