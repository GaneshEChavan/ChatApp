/***************************************************************************************************************
 *  Execution:  node temp_conversion.js
 *
 *  Purpose: Given the temperature in fahrenheit as input outputs the temperature in Celsius or viceversa using
 *  the formula.
 *
 *  @author  Ganesh Chavan
 *  @version 1.0
 *  @since   28-08-2019
 *
 **************************************************************************************************************/
/*
 * imported the logic from utility.
 */
const select = require("../utility/temp_conversionBL");
/*
 * The readline module provides an interface for reading data from a Readable stream (such as process.stdin)
 * one line at a time.
 */
const rl = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout
});
/*
 *created new instance of select class contains to celcius and to fahrenheit methods
 */
let method = new select();
/*
 * The rl.question() method displays the query, waits for user input to be provided on input, then invokes the
 * callback function passing the provided input as the first argument.
 */
rl.question(
  "press 1 for val to celcius, 2 for val to fahrenheit >",
  userVal => {
    choice = parseInt(userVal);
    /*
     *switch statement executes its expression and compare with case values and execute the method in that case.
     */
    switch (choice) {
      case 1:
        /*
         * case 1 execute for Fahrenheit value to convert in celcius
         */
        rl.question(
          "Enter the Fahrenheit value to convert in celcius >",
          val => {
            Fahrenheit = parseInt(val);
            console.log(method.toCelcius(Fahrenheit));
            /*
             * rl.close() method closes the interface
             */
            rl.close();
          }
        );

      case 2:
        /*
         * case 2 execute for celcius value to convert in Fahrenheit
         */
        rl.question(
          "Enter the celcius value to convert in Fahrenheit >",
          val => {
            celcius = parseInt(val);
            console.log(method.toFahrenheit(celcius));
            /*
             * rl.close() method closes the interface
             */
            rl.close();
          }
        );
    }
  }
);
