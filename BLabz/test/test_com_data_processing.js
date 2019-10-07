const assert = require("chai").assert;
const dataProcess = require("../object_oriented/utility/commersial_data_processingBL");

let data = new dataProcess();
describe("commersial data processing", function() {
  it("check for empty json 1", function() {
    result = data.accountNames();
    assert.equal(result, "json is empty");
  });
  it("check for empty json 2", function() {
    result = data.displaystock();
    assert.equal(result, "json is empty");
  });
  it("varify the ");
});
