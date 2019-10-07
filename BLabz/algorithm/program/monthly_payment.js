/***************************************************************************************************************
 *  Execution:  node monthly_payment.js
 *
 *  Purpose: reads in three command-line arguments Amount, Year and Rate and calculates the monthly payments.
 *
 *  @author  Ganesh Chavan
 *  @version 1.0
 *  @since   28-08-2019
 *
 **************************************************************************************************************/
/*
 * imported the logic from utility.
 */
const calculate = require("../utility/monthly_paymentBL");
/*
 *created new instance of select class contains simple interest and compound interest methods
 */
const interest = new calculate();
/* The readline module provides an interface for reading data from a Readable stream (such as process.stdin)
 * one line at a time.
 */
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout
});
/*
 *declared variables
 */
let [amount, years, rate] = [0, 0, 0];
/*
 * The rl.question() method displays the query, waits for user input to be provided on input, then invokes the
 * callback function passing the provided input as the first argument.
 */
readline.question("amount to be credited  >", userInput => {
  amount = parseFloat(userInput);
  readline.question("number of years  >", userInput => {
    years = parseFloat(userInput);
    readline.question("rate of interet  >", userInput => {
      rate = parseFloat(userInput);
      readline.question(
        "type 1 for compound interest, 2 for simple interest  >",
        userChoice => {
          userChoice = parseInt(userChoice);
          /*
           * switch statement executes its expression and compare with case values and execute the method in
           * that case.
           */
          switch (userChoice) {
            case 1:
              console.log(interest.compoundInterest(amount, years, rate));
              readline.close();
              /*
               * The optional break statement associated with each case label ensures that the program breaks out
               * of switch once the matched statement is executed.
               */
              break;

            case 2:
              console.log(interest.simpleInterest(amount, years, rate));
              readline.close();
              break;
            default:
              console.log("no choice");
              /*
               * readline.close() method closes the interface
               */
              readline.close();
          }
        }
      );
    });
  });
});
