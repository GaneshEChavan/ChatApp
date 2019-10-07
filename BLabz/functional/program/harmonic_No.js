/***************************************************************************************************************
 *  Execution:  node harmonic_No.js
 *
 *  Purpose:  Calculates the harmonic number till user given limit.
 *
 *  @author  Ganesh Chavan
 *  @version 1.0
 *  @since   28-08-2019
 *
 **************************************************************************************************************/
/*
 * imported the logic from utility.
 */
const harmonic = require("../utility/harmonic_noBL");
/* The readline module provides an interface for reading data from a Readable stream (such as process.stdin)
 * one line at a time.
 */
const rl = require("readline").createInterface(process.stdin, process.stdout);
rl.question("Enter the value of n for 2^n  >", value => {
  value = parseInt(value);
  console.log(harmonic(value));
  rl.close();
});
