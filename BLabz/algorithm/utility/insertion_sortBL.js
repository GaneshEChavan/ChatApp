/***************************************************************************************************************
 *  Execution:  No
 *
 *  Purpose:logic to sort provided data using insertion sort with exception handling.
 *
 *  @author  Ganesh Chavan
 *  @version 1.0
 *  @since   28-08-2019
 *
 **************************************************************************************************************/
/*
 * function will work for both string and number
 */
function insertionSort(arr) {
  /*
   *used try-catch to handle exceptions
   */
  try {
    if (typeof arr !== "object") throw false;
    for (let i = 1; i < arr.length; i++) {
      for (let j = 0; j < i; j++) {
        if (arr[i] < arr[j]) {
          let temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
        }
      }
    }
    return arr;
    /*
     * thrown error catched here
     */
  } catch (err) {
    return err;
  }
}
module.exports = insertionSort;
/*
 *used foreach method instead of using for loop
 */
function insertion_sort() {
  arr.forEach((ele, i) => {
    let a = arr.slice(0, i + 1);
    a.forEach((ell, j) => {
      if (a[i] < a[j]) {
        let temp = a[i];
        a[i] = a[j];
        a[j] = temp;
      }
    });
    arr = arr.map((x, inx) => a[inx] || arr[inx]);
  });
  console.log(arr);
}
