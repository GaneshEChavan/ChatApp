/***************************************************************************************************************
 *  Execution:  node quadratic_equation.js
 *
 *  Purpose:  Calculates the values of quadratic equation.
 *
 *  @author  Ganesh Chavan
 *  @version 1.0
 *  @since   28-08-2019
 *
 **************************************************************************************************************/
/*
 *imported the logic from utility file.
 */
const Quadra = require("../utility/quadratic_equationBL");
/* The readline module provides an interface for reading data from a Readable stream (such as process.stdin)
 * one line at a time.
 */
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout
});
readline.question(
  "Enter the values of (a,b,c) of quadratic equation (ax^2+bx+c) >a=...",
  val => {
    first = parseInt(val);
    readline.question("> b =  ", val => {
      second = parseInt(val);
      readline.question("> c =  ", val => {
        third = parseInt(val);
        console.log(Quadra(first, second, third));
        readline.close();
      });
    });
  }
);
