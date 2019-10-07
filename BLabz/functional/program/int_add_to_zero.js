/***************************************************************************************************************
 *  Execution:  node int_add_to_zero.js
 *
 *  Purpose:  Gives the possibilities of numbers that by adding three numbers give zero.
 *
 *  @author  Ganesh Chavan
 *  @version 1.0
 *  @since   28-08-2019
 *
 **************************************************************************************************************/
/*
 * imported the logic from utility.
 */
const check = require("../utility/int_add_to_zeroBL");
/* The readline module provides an interface for reading data from a Readable stream (such as process.stdin)
 * one line at a time.
 */
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout
});
readline.question("Enter numbers to check possibility  >", val => {
  input = val;
  let regx = /,/gi;
  let a = input.replace(regx, " ");
  let array = a.split(" ");
  let arr = [];
  array.forEach(ele => {
    arr.push(parseInt(ele));
  });
  console.log(check(arr));
  readline.close();
});
