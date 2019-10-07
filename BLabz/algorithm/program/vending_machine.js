/***************************************************************************************************************
 *  Execution:  node vending_machine.js
 *
 *  Purpose: Determines fewest Notes to be returned for Vending Machine.
 *
 *  @author  Ganesh Chavan
 *  @version 1.0
 *  @since   28-08-2019
 *
 **************************************************************************************************************/
/*
 * imported the logic from utility.
 */
const calculate = require("../utility/vending_machineBL");

/*
 * The readline module provides an interface for reading data from a Readable stream (such as process.stdin)
 * one line at a time.
 */
let readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout
});

/*
 * The rl.question() method displays the query, waits for user input to be provided on input, then invokes the
 * callback function passing the provided input as the first argument.
 */
readline.question("Enter the amount you want change >", userValue => {
  enteredAmount = parseInt(userValue);
  console.log(calculate(enteredAmount));
  /*
   * rl.close() method closes the interface
   */
  readline.close();
});
