/***************************************************************************************************************
 *  Execution:  node anagram.js
 *
 *  Purpose: Determines Two Strings are Anagram or not....
 *
 *  @author  Ganesh Chavan
 *  @version 1.0
 *  @since   28-08-2019
 *
 **************************************************************************************************************/
/*
 * imported the logic from utility.
 */
const check = require("../utility/anagramBL");
/* The readline module provides an interface for reading data from a Readable stream (such as process.stdin)
 * one line at a time.
 */
const rl = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout
});
/*
 * The rl.question() method displays the query, waits for user input to be provided on input, then invokes the
 * callback function passing the provided input as the first argument.
 */
rl.question("Enter your first text  >", userInput => {
  statementFirst = userInput;
  rl.question("Enter your second text   >", userInput => {
    statementSecond = userInput;
    console.log(check(statementFirst, statementSecond));
    /*
     * readline.close() method closes the interface
     */
    rl.close();
  });
});
