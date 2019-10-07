/***************************************************************************************************************
 *  Execution:  node leap_year.js
 *
 *  Purpose:  Check for the year is leap or not for user provided value.
 *
 *  @author  Ganesh Chavan
 *  @version 1.0
 *  @since   28-08-2019
 *
 **************************************************************************************************************/
/*
 * imported the logic from utility.
 */
const LeapYear = require("../utility/leap_yearBL");
/* The readline module provides an interface for reading data from a Readable stream (such as process.stdin)
 * one line at a time.
 */
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
rl.question("Enter Year   >>", year => {
  year = parseInt(year);
  console.log(LeapYear(year));
  rl.close();
});
