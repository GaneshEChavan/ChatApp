const assert = require("chai").assert;
const tempConv = require("../algorithm/utility/temp_conversionBL");
const temp = new tempConv();
describe("temp_conversion", function() {
  it("data-type of argument should be number", function() {
    result = temp.toCelcius(16);
    assert.typeOf(result, "number");
  });
  it("argument should not be string", function() {
    result = temp.toCelcius("16");
    assert.equal(result, "invalid input");
  });
  it("number must be positive", function() {
    result = temp.toCelcius();
    assert.equal(result, "invalid input");
  });
  it("no argument passed", function() {
    result = temp.toFahrenheit(16);
    assert.typeOf(result, "number");
  });
  it("no argument passed", function() {
    result = temp.toFahrenheit("16");
    assert.equal(result, "invalid input");
  });
  it("no argument passed", function() {
    result = temp.toFahrenheit();
    assert.equal(result, "invalid input");
  });
});
