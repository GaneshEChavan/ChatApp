/***************************************************************************************************************
 *  Execution:  node day_of_week.js
 *
 *  Purpose: Takes a date as input and prints the day of the week that date falls on.
 *
 *  @author  Ganesh Chavan
 *  @version 1.0
 *  @since   28-08-2019
 *
 **************************************************************************************************************/
/*
 * imported the logic from utility.
 */
const dayOfWeek = require("../utility/day_of_weekBL");
/* The readline module provides an interface for reading data from a Readable stream (such as process.stdin)
 * one line at a time.
 */
const rl = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("Enter date in format 01/01/1111 to check day on given date");
/*
 * The rl.question() method displays the query, waits for user input to be provided on input, then invokes the
 * callback function passing the provided input as the first argument.
 */
rl.question("Enter date  >", userValue => {
  D = parseInt(userValue);
  rl.question("Enter month  >", userValue => {
    M = parseInt(userValue);
    rl.question("Enter year  >", userValue => {
      Y = parseInt(userValue);
      let ans = dayOfWeek(D, M, Y);
      console.log(ans[0]);
      /*
       * readline.close() method closes the interface
       */
      rl.close();
    });
  });
});
