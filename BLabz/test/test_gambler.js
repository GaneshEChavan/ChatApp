const assert = require("chai").assert;
const gamble = require("../functional/utility/gamblerBL");

describe("Gambler", function() {
  it("output in text", function() {
    result = gamble(2, 4);
    assert.typeOf(result, "string");
  });
  it("any arguments must not be string", function() {
    result = gamble("2", 4);
    assert.isBoolean(result, "arg is in string or not provided");
  });
  it("arguments must provide", function() {
    result = gamble();
    assert.isBoolean(result, "arg is in string or not provided");
  });
  it("all arguments must positive", function() {
    result = gamble(-2, 4);
    assert.equal(result, "provided negative values");
  });
  it("all arguments must numbers", function() {
    result = gamble(parseInt({}), parseInt([]));
    assert.equal(result, "not a number");
  });
});
