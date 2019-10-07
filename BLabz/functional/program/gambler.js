/***************************************************************************************************************
 *  Execution:  node gambler.js
 *
 *  Purpose:  Calculates Number of Wins and Percentage of Win and Loss in gambler game.
 *
 *  @author  Ganesh Chavan
 *  @version 1.0
 *  @since   28-08-2019
 *
 **************************************************************************************************************/
/*
 * imported the logic from utility.
 */
const gamble = require("../utility/gamblerBL");
/* The readline module provides an interface for reading data from a Readable stream (such as process.stdin)
 * one line at a time.
 */
const rl = require("readline").createInterface(process.stdin, process.stdout);

rl.question("enter the goal amount   >", userValue => {
  goal = parseInt(userValue);
  rl.question("enter the stake amount   >", userValue => {
    stake = parseInt(userValue);
    let stk = stake;
    console.log(gamble(stk, goal));
    rl.close();
  });
});
