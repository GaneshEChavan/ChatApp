let checkRegx = (firstName, mobNo, str, date) => {
  try {
    let checkName = /^[a-z]*/.exec(firstName);
    let checkmob = /^[0-9]{10}/.exec(mobNo);
    if (checkName[0].length !== 0) {
      newStr = str
        .replace("<<name>>", checkName[0])
        .replace("<<full name>>", checkName.input)
        .replace("xxxxxxxxxx", checkmob[0])
        .replace("01 / 01 / 2016", date);
      return console.log(newStr);
    } else {
      return console.log("given is not name");
    }
  } catch (error) {
    return console.log("given is not number");
  }
};
module.exports = checkRegx;
