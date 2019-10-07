/***************************************************************************************************************
 *  Execution:  node wind_chill.js
 *
 *  Purpose:  Calculates the value of windchill using userInput.
 *
 *  @author  Ganesh Chavan
 *  @version 1.0
 *  @since   28-08-2019
 *
 **************************************************************************************************************/
/*
 *imported the logic from utility file.
 */
const windchill = require("../utility/wind_chillBL");
/* The readline module provides an interface for reading data from a Readable stream (such as process.stdin)
 * one line at a time.
 */
const readline = require("readline").createInterface(
  process.stdin,
  process.stdout
);
readline.question("Enter Temperature must below 50 farheneit  >", userInput => {
  temperature = parseInt(userInput);
  readline.question(
    "Enter Wind speed must between 3 to 120 mph  >",
    userInput => {
      windSpeed = parseInt(userInput);
      console.log(windchill(temperature, windSpeed));
      readline.close();
    }
  );
});
