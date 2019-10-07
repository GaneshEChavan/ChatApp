function leapYear(check) {
  try {
    if (typeof check !== "number") throw false;
    if (check < 0) throw "number must be positive";
    return check % 4 == 0
      ? `${check} is Leap Year`
      : `${check} is not Leap Year`;
  } catch (err) {
    return err;
  }
}
module.exports = leapYear;
