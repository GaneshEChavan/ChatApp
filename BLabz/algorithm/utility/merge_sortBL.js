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
let arr = [5, 1, 9, 11, 2];
/*
 *function to sort the array upto single value
 */
function mergeSort(arr) {
  if (arr.length === 1) {
    return arr;
  }
  let midTerm = Math.floor(arr.length / 2);
  let left1 = arr.slice(0, midTerm);
  let right1 = arr.slice(midTerm);
  mergeSort(left1), mergeSort(right1);
  merge(left1, right1);
}
/*
 *function to merge the sorted array with comparing
 */
function merge(left, right) {
  let finalArray = [];
  while (left.length && right.length) {
    if (left[0] < right[0]) {
      finalArray.push(left.shift());
    } else {
      finalArray.push(right.shift());
    }
  }
  /*
   *used spread operator to concat the other array values into final array
   */
  console.log(...finalArray, ...left, ...right);
}

mergeSort(arr);
