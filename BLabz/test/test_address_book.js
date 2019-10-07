const assert = require("chai").assert;
const adressBook = require("../object_oriented/utility/address_bookBL");

let book = new adressBook();
describe("Address Book", function() {
  it("check for json is empty", function() {
    result = book.mailingFormat();
    assert.equal(result, "it is an empty JSON");
  });
  it("check for invalid arguments 1", function() {
    result = book.addPerson(
      [],
      "lamba",
      "gangapuri",
      "patna",
      "bihar",
      6845,
      3545
    );
    assert.isBoolean(result, "Inputs are invalid");
  });
  it("check for json is empty", function() {
    result = book.deletePerson(5486);
    assert.equal(result, "invalid Input");
  });
  it("check for undefined arguments 1", function() {
    result = book.deletePerson();
    assert.equal(result, "invalid Input");
  });
  it("check for invalid arguments 2", function() {
    result = book.updateInfo(
      "jaywant",
      "gangapuri",
      "patna",
      "bihar",
      6845,
      3545
    );
    assert.equal(result, "Not registered in book");
  });
  it("check for file name 1", function() {
    result = book.createNewFile(123);
    assert.equal(result, "improper file name");
  });
  it("check for file name 2", function() {
    result = book.createNewFile([]);
    assert.equal(result, "improper file name");
  });
  it("check for existing file 1", function() {
    result = book.useExistingFile(789);
    assert.equal(result, "improper file name");
  });
  it("check for existing file 2", function() {
    result = book.useExistingFile({});
    assert.equal(result, "improper file name");
  });
});
