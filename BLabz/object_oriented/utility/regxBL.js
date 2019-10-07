let datetime = require("node-datetime");

let checkRegx = (Name, num, str) => {
  try {
    let date = datetime.create().format("d / m / y");
    if (Name.length < 1) throw "Invalid input";
    if (num.length < 1) throw "invalid input";
    let name = /[a-z]*/gi.exec(Name);
    let test = /\d{10}/.test(num);
    if (test === false) throw "Mobile Number provided is wrong";
    let mobile = /\d{10}/.exec(num);
    let newStr = str
      .replace("<<name>>", name[0])
      .replace("<<full name>>", name.input)
      .replace("91-xxxxxxxxxx", mobile[0])
      .replace("xx/xx/xxxx", date);
    return newStr;
  } catch (err) {
    return err;
  }
};
module.exports = checkRegx;
