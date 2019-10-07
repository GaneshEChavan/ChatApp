const assert = require("chai").assert;
const quadrat = require("../functional/utility/quadratic_equationBL");

describe("quadrqtic_equation", function() {
  it("output in string", function() {
    result = quadrat(4, 5, 6);
    assert.typeOf(result, "string");
  });
  it("argument must not be string", function() {
    result = quadrat("4", 5, 6);
    assert.isBoolean(result, "arg is in string");
  });
  it("arguments must provide", function() {
    result = quadrat();
    assert.isBoolean(result, "arg is not provided");
  });
  it("all arguments must numbers", function() {
    result = quadrat(parseInt({}));
    assert.isBoolean(result, "not a number");
  });
});
