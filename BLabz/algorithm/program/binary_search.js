/***************************************************************************************************************
 *  Execution:  node binary_search.js
 *
 *  Purpose: Take input from. Then prompt the user to enter a word to search the list.
 *  The program reports if the search word is found in the list.
 *
 *  @author  Ganesh Chavan
 *  @version 1.0
 *  @since   28-08-2019
 *
 **************************************************************************************************************/
/*
 * imported the logic from utility.
 */
const b_search = require("../utility/binary_searchBL");
/*
 * Passing in arguments via the command line
 */
const argument = process.argv;
/*
 *first 2 element are path of node file and path to the JavaScript file being executed, remaining are passed
 * arguments
 */
const list = argument.slice(2).sort();
/* The readline module provides an interface for reading data from a Readable stream (such as process.stdin)
 * one line at a time.
 */
const readline = require("readline").createInterface(
  process.stdin,
  process.stdout
);
/*
 * The rl.question() method displays the query, waits for user input to be provided on input, then invokes the
 * callback function passing the provided input as the first argument.
 */
readline.question(
  "Enter the numbr to be checked in provided list  >",
  userValue => {
    checkValue = userValue;
    let startIndex = 0;
    let endIndx = list.length - 1;
    console.log(b_search(startIndex, endIndx, checkValue, list));
    /*
     * readline.close() method closes the interface
     */
    readline.close();
  }
);
console.log(list);
