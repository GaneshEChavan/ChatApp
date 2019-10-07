const assert = require("chai").assert;
const coupon = require("../functional/utility/coupon_generateBL");

describe("coupon_generate", function() {
  it("output in array", function() {
    result = coupon(15);
    assert.isArray(result, "function always return array");
  });
  it("arguments must not be string", function() {
    result = coupon("15");
    assert.isBoolean(result, "arg is in string");
  });
  it("arguments must provide", function() {
    result = coupon();
    assert.isBoolean(result, "arg not provided");
  });
  it("arguments must provide", function() {
    result = coupon(-15);
    assert.equal(result, "not valid input");
  });
});
