/***************************************************************************************************************
 *  Execution:  No
 *
 *  Purpose:logic to sort provided data using bubble sort with exception handling.
 *
 *  @author  Ganesh Chavan
 *  @version 1.0
 *  @since   28-08-2019
 *
 **************************************************************************************************************/
/*
 * function will work for both string and number
 */
function bubble_sort(array) {
  /*
   *used try-catch to handle exceptions
   */
  try {
    /*
     *throws the error if condition is not satisfied
     */
    if (typeof array !== "object") throw false;
    let temporary = 0;
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length; j++) {
        if (array[j + 1] < array[j]) {
          temporary = array[j];
          array[j] = array[j + 1];
          array[j + 1] = temporary;
        }
      }
    }
    return array;
  } catch (err) {
    return err;
  }
}
module.exports = bubble_sort;
