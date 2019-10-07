let read = require("readline-sync");
let date = require("node-datetime");
let reg = require("../oop_utility/regexpBL.js");
let regExp = new reg();
try {
  const str =
    "Hello <<name>>, We have your full name as <<full name>> in our system. your contact number is 91-xxxxxxxxxx. Please,let us know in case of any clarification Thank you BridgeLabz 01/01/2016";
  regExp.readInput();
  let res = regExp.checkRegExp();
  console.log(res);
  //replaces given string with name,phone number,
  str1 = str
    .replace("<<name>>", res[0][0])
    .replace("<<full name>>", res[3])
    .replace("xxxxxxxxxx", res[1])
    .replace("01/01/2016", res[2]);
  console.log(str1);
} catch (e) {
  //catches if exception occurs
  console.log(e);
}
