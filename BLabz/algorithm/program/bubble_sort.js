/***************************************************************************************************************
 *  Execution:  node bubble_sort.js
 *
 *  Purpose: Takes a date as input and prints the day of the week that date falls on.
 *
 *  @author  Ganesh Chavan
 *  @version 1.0
 *  @since   28-08-2019
 *
 **************************************************************************************************************/
/*
 * imported the logic from utility.
 */
const bubbleSort = require("../utility/bubble_sortBL");
/* The readline module provides an interface for reading data from a Readable stream (such as process.stdin)
 * one line at a time.
 */
const rl = require("readline").createInterface(process.stdin, process.stdout);
/*
 * The rl.question() method displays the query, waits for user input to be provided on input, then invokes the
 * callback function passing the provided input as the first argument.
 */
rl.question("Enter your Input", userValue => {
  let input = userValue;
  /*
   *regx is used to replace commas(,) from input
   */
  let regx = /,/gi;
  let a = input.replace(regx, " ");
  let array = a.split(" ");
  let arr = [];
  /*
   *array.forEach() function calls the provided function once for each element of the array
   */
  array.forEach(ele => {
    arr.push(parseInt(ele));
  });
  console.log(bubbleSort(arr));
  /*
   * readline.close() method closes the interface
   */
  rl.close();
});
