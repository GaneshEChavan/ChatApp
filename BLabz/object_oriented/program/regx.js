const regexp = require("../utility/regxBL");
let rl = require("readline-sync");
let str =
  "Hello <<name>>, We have your full name as <<full name>> in our system. your contact number is 91-xxxxxxxxxx. Please,let us know in case of any clarification Thank you BridgeLabz xx/xx/xxxx.";
let Name = rl.question("Enter your full name  >");
let num = rl.question("Enter your mob number  >");
console.log(regexp(Name, num, str));
