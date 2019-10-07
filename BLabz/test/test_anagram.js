const assert = require("chai").assert;
const anagram = require("../algorithm/utility/anagramBL");

describe("anagram", function() {
  it("accept string", function() {
    let result = anagram("", "");
    assert.typeOf(result, "string");
  });
  it("does not accept array", function() {
    let result = anagram([], []);
    assert.equal(result, "Invalid input");
  });
  it("does not accept numbers", function() {
    let result = anagram(879, 987);
    assert.equal(result, "Invalid input");
  });
  it("should not pass null argumrnts", function() {
    let result = anagram();
    assert.equal(result, "have to pass both arguments");
  });
  it("length of arguments should be equal", function() {
    let result = anagram("earth", "eart");
    assert.equal(result, "not anagram");
  });
});
