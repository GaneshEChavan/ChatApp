const assert = require("chai").assert;
let unorder = require("/home/mobicomp/BLabz/data_structure/utility/unordered_listBL.js");
let ul = new unorder();

describe("unordered_list", function() {
  it("data to adding node must provide", function() {
    result = ul.add_node();
    assert.equal(result, "Error in providing value");
  });
  it("list is empty1", function() {
    result = ul.display();
    assert.equal(result, "Nothing to display");
  });
  it("list is empty2", function() {
    result = ul.delete_at_specific_pos(2);
    assert.equal(result, "list is empty");
  });
  it("list is empty3", function() {
    result = ul.delete_specific_val(2);
    assert.isBoolean(result, "list is empty");
  });
  it("list is empty4", function() {
    result = ul.index(2);
    assert.equal(result, "list is empty");
  });
  it("list is empty5", function() {
    result = ul.search(2);
    assert.equal(result, "nothing to search");
  });
  it("list is empty6", function() {
    result = ul.appendData();
    assert.equal(result, "list is already empty");
  });
  it("value should be provided to delete", function() {
    ul.add_node(10);
    ul.add_node(20);
    result = ul.delete_specific_val();
    assert.equal(result, "Error in providing value");
  });
  it("display data in string", function() {
    result = ul.appendData();
    assert.typeOf(result, "string");
  });
});
