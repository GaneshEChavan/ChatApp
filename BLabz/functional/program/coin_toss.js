/***************************************************************************************************************
 *  Execution:  node coin_toss.js
 *
 *  Purpose:  Determines percentage of head and tail.
 *
 *  @author  Ganesh Chavan
 *  @version 1.0
 *  @since   28-08-2019
 *
 **************************************************************************************************************/
/*
 * imported the logic from utility.
 */
const tossPercentage = require("../utility/coin_tossBL");
/* The readline module provides an interface for reading data from a Readable stream (such as process.stdin)
 * one line at a time.
 */
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout
});

readline.question("Enter the max. number of tosses...", userInput => {
  userInput = parseInt(userInput);
  console.log(tossPercentage(userInput));
  readline.close();
});
