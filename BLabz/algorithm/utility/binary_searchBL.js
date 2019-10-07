/***************************************************************************************************************
 *  Execution:  No
 *
 *  Purpose:logic to search user input using binary search, with exception handling.
 *
 *  @author  Ganesh Chavan
 *  @version 1.0
 *  @since   28-08-2019
 *
 **************************************************************************************************************/
function binarySearch(startIndex, endIndex, check, list) {
  /*
   *used try-catch to handle exceptions
   */
  try {
    if (startIndex < 0 || startIndex > endIndex)
      throw "start index must non-negative and less than end index";
    if (startIndex === undefined) throw false;
    if (endIndex === undefined) throw false;
    if (check === undefined) throw false;
    if (list === undefined) throw false;
    let midTerm = parseInt((startIndex + endIndex) / 2);
    if (startIndex > endIndex) return `${check} is not in list`;
    /*
     *used TERNERY OPERATOR similar to if_else
     */
    return list[midTerm] == check
      ? `${check} is present in list`
      : check < list[midTerm]
      ? binarySearch(startIndex, midTerm - 1, check, list)
      : check > list[midTerm]
      ? binarySearch(midTerm + 1, endIndex, check, list)
      : `${check} is not present`;
  } catch (err) {
    return err;
  }
}
module.exports = binarySearch;
