let date = require("node-datetime");
let read = require("readline-sync");
class regular {
  constructor() {
    //regular expressionfor number to be 10
    let fullname;
    let number;
    let firstname;
    let date;
  }
  //data Encaplusation
  set fullname(name) {
    this.fullname = name;
  }
  set number(num) {
    this.number = num;
  }
  set firstname(name) {
    this.firstname = name;
  }
  set date(date) {
    this.date = date;
  }
  get fullname() {
    return this.fullname;
  }
  get number() {
    return this.number;
  }
  get firstname() {
    return this.firstname;
  }
  get date() {
    return this.date;
  }
}
//reads the name and phone number from users
regular.prototype.readInput = () => {
  let name = read.question("Enter full name:::");
  let num = read.questionInt("Enter your contact number:::");
  this.fullname = name;
  this.number = num;
  if (name.length <= 0) throw "Name cant be null";
};
/*checks for regExp for name and number ,convert the date to dd/mm/yyy,retruns all the three values,if no string is matching it throws 
exception to called function*/
regular.prototype.checkRegExp = () => {
  try {
    //.exec is execute the given pattern with string
    let fname = /(^[a-z]*)/.exec(this.fullname);
    this.firstname = fname;
    let NUM = /(^[0-9]{10})/.exec(this.number);
    this.number = NUM;
    let dt = date.create(new Date());
    //to format the date mm/dd/yyy format.
    let format = dt.format("m/d/Y");
    this.date = format;
    if (fname === null || fname.length <= 0) {
      throw "Not a proper NAME ";
    }
    if (NUM === null) {
      throw "Not a Proper Number";
    }
    return [this.firstname, this.number, this.date, this.fullname];
  } catch (e) {
    console.log(e);
  }
};
module.exports = regular;
