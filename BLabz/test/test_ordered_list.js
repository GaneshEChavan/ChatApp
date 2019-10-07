const assert = require("chai").assert;
let order = require("/home/mobicomp/BLabz/data_structure/utility/ordered_listBL.js");
let ol = new order();

describe("ordered_list", function() {
  it("data to adding node must provide", function() {
    result = ol.addNode();
    assert.equal(result, "Error in providing value");
  });
  it("list is empty1", function() {
    result = ol.addNode([]);
    assert.equal(result, "value cant be object");
  });
  it("list is empty2", function() {
    result = ol.display();
    assert.equal(result, "Nothing to display");
  });
  it("list is empty3", function() {
    result = ol.delete(2);
    assert.isBoolean(result, "list is empty");
  });
  it("list is empty4", function() {
    result = ol.search(2);
    assert.equal(result, "nothing to search");
  });
  it("list is empty5", function() {
    result = ol.appendData();
    assert.equal(result, "no data to append");
  });
  it("list is empty6", function() {
    ol.addNode(10);
    ol.addNode(20);
    result = ol.delete();
    assert.equal(result, "Error in providing value");
  });
  it("list is empty5", function() {
    result = ol.appendData();
    assert.typeOf(result, "string");
  });
});
