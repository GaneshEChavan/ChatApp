const rl = require("readline-sync");
const fs = require("fs");
const linkList = require("../../data_structure/utility/unordered_listBL");
let addToLinkList = () => {
  const jsonfile = JSON.parse(
    fs.readFileSync(
      "/home/mobicomp/BLabz/object_oriented/json_files/stock_report.json"
    )
  );
  let ll = new linkList();

  for (let i in jsonfile) {
    ll.add_node(jsonfile[i]);
  }
  ll.display();
  console.log(">>>>>>added to node<<<<<<<");
  let remove = rl.question("Enter the name of share u want to delete  >");
  ll.delete_object(remove);
  ll.display();
};
module.exports = addToLinkList;
