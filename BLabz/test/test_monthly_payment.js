const assert = require("chai").assert;
const payment = require("../algorithm/utility/monthly_paymentBL");
const interest = new payment();

describe("binary_search", function() {
  it("compound interest is showed", function() {
    let result = interest.compoundInterest(1000, 10, 10);
    assert.typeOf(result, "string");
  });
  it("simple interest is shown", function() {
    let result = interest.simpleInterest(1000, 10, 21);
    assert.typeOf(result, "string");
  });
  it("values given must be positive", function() {
    let result = interest.compoundInterest(-1000, 10, 10);
    assert.equal(result, "input must be positive");
  });
  it("start index should not null", function() {
    let result = interest.compoundInterest(1000, 10, 21);
    assert.equal(result, "usually interest rate is below 20%");
  });
  it("values given must be positive", function() {
    let result = interest.simpleInterest(-1000, 10, 10);
    assert.equal(result, "input must be positive");
  });
  it("start index should not null", function() {
    let result = interest.simpleInterest(1000, 10, 21);
    assert.equal(result, "usually interest rate is below 20%");
  });
});
