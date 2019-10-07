/***************************************************************************************************************
 *  Execution:  node powers_of_2.js
 *
 *  Purpose:  Gives the powers of 2 .
 *
 *  @author  Ganesh Chavan
 *  @version 1.0
 *  @since   28-08-2019
 *
 **************************************************************************************************************/
/*
 *imported the logic from utility file.
 */
const powers = require("../utility/powers_of_2BL");
/* The readline module provides an interface for reading data from a Readable stream (such as process.stdin)
 * one line at a time.
 */
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
rl.question("Enter power value upto   >", pow => {
  power = parseInt(pow);
  console.log(powers(power));
  rl.close();
});
