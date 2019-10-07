/***************************************************************************************************************
 *  Execution:  node coupon_generate.js
 *
 *  Purpose:  Generate random coupons within 3 digit numbers.
 *
 *  @author  Ganesh Chavan
 *  @version 1.0
 *  @since   28-08-2019
 *
 **************************************************************************************************************/
/*
 * imported the logic from utility.
 */
const coupon_generate = require("../utility/coupon_generateBL");
/* The readline module provides an interface for reading data from a Readable stream (such as process.stdin)
 * one line at a time.
 */
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
rl.question("Enter number of coupons to generate below 100  >", count => {
  count = parseInt(count);
  console.log(coupon_generate(count));
  rl.close();
});
