const assert = require("chai").assert;
const regx = require("../object_oriented/utility/regxBL");

describe("regx", function() {
  it("check name is provided or not", function() {
    result = regx(
      "",
      9876987698,
      "Hello <<name>>, We have your full name as <<full name>> in our system. your contact number is 91-xxxxxxxxxx. Please,let us know in case of any clarification Thank you BridgeLabz xx/xx/xxxx."
    );
    assert.equal(result, "Invalid input");
  });
  it("check mobile number is provided or not", function() {
    result = regx(
      "abc def",
      "",
      "Hello <<name>>, We have your full name as <<full name>> in our system. your contact number is 91-xxxxxxxxxx. Please,let us know in case of any clarification Thank you BridgeLabz xx/xx/xxxx."
    );
    assert.equal(result, "invalid input");
  });
  it("check mobile number is right or wrong 1", function() {
    result = regx(
      "abc def",
      "869889hj87",
      "Hello <<name>>, We have your full name as <<full name>> in our system. your contact number is 91-xxxxxxxxxx. Please,let us know in case of any clarification Thank you BridgeLabz xx/xx/xxxx."
    );
    assert.equal(result, "Mobile Number provided is wrong");
  });
  it("check mobile number is right or wrong 2", function() {
    result = regx(
      "abc def",
      "86988987",
      "Hello <<name>>, We have your full name as <<full name>> in our system. your contact number is 91-xxxxxxxxxx. Please,let us know in case of any clarification Thank you BridgeLabz xx/xx/xxxx."
    );
    assert.equal(result, "Mobile Number provided is wrong");
  });
});
