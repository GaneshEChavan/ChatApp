/***************************************************************************************************************
 *  Execution:  No
 *
 *  Purpose:logic to determine the anagram with exception handling.
 *
 *  @author  Ganesh Chavan
 *  @version 1.0
 *  @since   28-08-2019
 *
 **************************************************************************************************************/

function checkDataType(a1, a2) {
  /*
   *used try-catch to handle exceptions
   */
  try {
    if (a1 === undefined || a2 === undefined)
      throw "have to pass both arguments";
    if (typeof a1 !== "string" && typeof a2 !== "string") throw "Invalid input";

    if (typeof a1 === "string" && typeof a2 === "string") {
      let arr1 = a1.split("").sort();
      let arr2 = a2.split("").sort();
      return arr1.length === arr2.length
        ? checkAnagram(arr1, arr2)
        : "not anagram";
    } else {
      let arr1 = a1.sort();
      let arr2 = a2.sort();
      return arr1.length === arr2.length
        ? checkAnagram(arr1, arr2)
        : "not anagram";
    }
    /*
     *function to check anagram
     */
    function checkAnagram(arr1, arr2) {
      let finalArray = [];
      arr1.forEach((element, inx) => {
        if (element === arr2[inx]) {
          finalArray.push(element);
        }
      });

      if (finalArray.length == arr1.length) {
        return "It's Anagram";
      } else {
        return "It's not Anagram";
      }
    }
  } catch (err) {
    return err;
  }
}
module.exports = checkDataType;
