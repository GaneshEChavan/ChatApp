const assert = require("chai").assert;
const windChill = require("../functional/utility/wind_chillBL");

describe("wind_chill", function() {
  it("output is in string", function() {
    result = windChill(2, 5);
    assert.typeOf(result, "number");
  });
  it("arguments not be string", function() {
    result = windChill("2", 5);
    assert.isBoolean(result, "input provided are invalid");
  });
  it("arguments must positive", function() {
    result = windChill();
    assert.isBoolean(result, "input not provided");
  });
  it("arguments not be within array", function() {
    result = windChill([]);
    assert.isBoolean(result, "invalid input");
  });
});
