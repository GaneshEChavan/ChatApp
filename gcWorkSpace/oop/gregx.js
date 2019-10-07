const rl = require("readline").createInterface(process.stdin, process.stdout);
const rgxBL = require("../oop_utility/regxTry.js");
const dateTime = require("node-datetime");

let dt = dateTime.create();
let today = dt.format("d/m/y");

let string =
  "Hello <<name>>, We have your full name as <<full name>> in our system. your contact number is +91-xxxxxxxxxx.Please, let us know in case of any clarification Thank you BridgeLabz 01 / 01 / 2016";

rl.question("Enter fullname  >", userValue => {
  fName = userValue;
  rl.question("Enter your mobNo  >", userInput => {
    MobNo = userInput;
    rgxBL(fName, MobNo, string, today);
    rl.close();
  });
});
