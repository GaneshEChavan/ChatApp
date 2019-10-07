/***************************************************************************************************************
 *  Execution:  node 2D_array.js
 *
 *  Purpose:  Print 2 Dimensional Array
 *
 *  @author  Ganesh Chavan
 *  @version 1.0
 *  @since   28-08-2019
 *
 **************************************************************************************************************/
/*
 * imported the logic from utility.
 */
const twoDArray = require("../utility/2D_arrayBL");
/* The readline module provides an interface for reading data from a Readable stream (such as process.stdin)
 * one line at a time.
 */
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout
});

/*
 *  Specifies initial values of Rows and Columns
 */

let [row, column] = [0, 0];

/*
 * Ask question to the user
 */
readline.question("Enter no of rows  >", userInput => {
  row = parseInt(userInput);
  readline.question("Enter no of columns  >", userInput => {
    column = parseInt(userInput);
    console.log(twoDArray(row, column));
    readline.close();
  });
});
