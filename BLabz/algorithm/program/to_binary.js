/*************************************************************************************************************
 *  Execution:  node to_binary.js
 *
 *  Purpose: Outputs the binary (base 2) representation of the decimal number typed as the input.
 *
 *  @author  Ganesh Chavan
 *  @version 1.0
 *  @since   28-08-2019
 *
 ************************************************************************************************************/
/*
 * imported the logic from utility.
 */
const to_binary = require("../utility/to_binaryBL");
/*
 * The readline module provides an interface for reading data from a Readable stream (such as process.stdin)
 * one line at a time.
 */
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout
});
/*
 * The rl.question() method displays the query, waits for user input to be provided on input, then invokes the
 * callback function passing the provided input as the first argument.
 */
readline.question("Enter the Decimal to be converted to Binary  >", val => {
  /*
   *parseInt take only integer value does not accept float
   */

  val = parseInt(val);
  console.log(to_binary(val));
  /*
   * rl.close() method closes the interface
   */
  readline.close();
});
