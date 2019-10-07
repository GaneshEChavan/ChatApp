const assert = require("chai").assert;
const harmonic = require("../functional/utility/harmonic_noBL");

describe("Gambler", function() {
  it("output in number", function() {
    result = harmonic(45);
    assert.typeOf(result, "number");
  });
  it("argument must not be string", function() {
    result = harmonic("45");
    assert.isBoolean(result, "arg is in string");
  });
  it("arguments must provide", function() {
    result = harmonic();
    assert.isBoolean(result, "arg is not provided");
  });
  it("argument must positive", function() {
    result = harmonic(-45);
    assert.equal(result, "must positive");
  });
  it("all arguments must numbers", function() {
    result = harmonic(parseInt({}));
    assert.equal(result, "not a number");
  });
});
