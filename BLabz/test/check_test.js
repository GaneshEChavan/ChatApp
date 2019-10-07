const assert = require("chai").assert;
const testFile = require("../functional/mocha_test");

describe("app", function() {
  it("should return hello world", function() {
    assert.equal(testFile(), "Hello World");
  });
});
