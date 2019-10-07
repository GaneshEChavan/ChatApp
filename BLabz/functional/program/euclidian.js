/***************************************************************************************************************
 *  Execution:  node euclidian.js
 *
 *  Purpose:  Calculates euclidian distance between two points.
 *
 *  @author  Ganesh Chavan
 *  @version 1.0
 *  @since   28-08-2019
 *
 **************************************************************************************************************/
/*
 * imported the logic from utility.
 */
const euclidian = require("../utility/euclidianBL");
const readline = require("readline");
/* The readline module provides an interface for reading data from a Readable stream (such as process.stdin)
 * one line at a time.
 */
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Enter x-ordinate of start point  >", userValue => {
  x1 = parseInt(userValue);
  rl.question("Enter y-ordinate of start  point  >", userValue => {
    y1 = parseInt(userValue);
    rl.question("Enter x-ordinate of end  point  >", userValue => {
      x2 = parseInt(userValue);
      rl.question("Enter y-ordinate of end  point  >", userValue => {
        y2 = parseInt(userValue);
        console.log(euclidian(x1, y1, x2, y2));
        rl.close();
      });
    });
  });
});
