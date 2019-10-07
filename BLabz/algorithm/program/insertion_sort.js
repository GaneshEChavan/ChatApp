/***************************************************************************************************************
 *  Execution:  node insertion_sort.js
 *
 *  Purpose: reads in three command-line arguments Amount, Year and Rate and calculates the monthly payments.
 *
 *  @author  Ganesh Chavan
 *  @version 1.0
 *  @since   28-08-2019
 *
 **************************************************************************************************************/
/*
 * imported the logic from utility.
 */
const insertionSort = require("../utility/insertion_sortBL");
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
   * spliting the string before passing to sorting returns array
   */
  let array = input.split("");
  console.log(insertionSort(array));
  /*
   * readline.close() method closes the interface
   */
  rl.close();
});
