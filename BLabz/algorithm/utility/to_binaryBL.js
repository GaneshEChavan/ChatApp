/***************************************************************************************************************
 *  Execution:  No
 *
 *  Purpose:logic to sort provided data using merge sort
 *
 *  @author  Ganesh Chavan
 *  @version 1.0
 *  @since   28-08-2019
 *
 **************************************************************************************************************/
var txt = "";
function to_binary(number) {
  try {
    if (typeof number !== "number") throw false;
    if (number < 0) throw "number must be positive";
    if (number > 0) {
      txt += `${number % 2}`;
      /*
       *RECURSION will execute while number is greater than 0
       */
      to_binary(parseInt((number /= 2)));
      /*
       *passed txt to reverse the string in function
       */
      return reverse(txt);
    }
  } catch (err) {
    return err;
  }
}
/*
 *function to reverse the string
 */
function reverse() {
  let text = txt
    .split("")
    .reverse()
    .join();
  var regx = /,/gi;
  return text.replace(regx, "");
}
module.exports = to_binary;
