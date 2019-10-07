/***************************************************************************************************************
 *  Execution:  No
 *
 *  Purpose:logic to convert temperature in fahrenheit as input outputs the temperature in Celsius or viceversa
 *
 *  @author  Ganesh Chavan
 *  @version 1.0
 *  @since   28-08-2019
 *
 **************************************************************************************************************/
class select {
  /*
   *function to convert temperature to celcius
   */
  toCelcius(fahrenheitValue) {
    /*
     *used try-catch to handle exceptions
     */
    try {
      if (typeof fahrenheitValue !== "number") throw "invalid input";
      var tempCheck = (fahrenheitValue - 32) * (5 / 9);
      return tempCheck;
    } catch (err) {
      return err;
    }
  }
  /*
   *function to convert temperature to fahrenheit
   */
  toFahrenheit(celciusVal) {
    try {
      if (typeof celciusVal !== "number") throw "invalid input";
      let temp = celciusVal * (9 / 5) + 32;
      return temp;
    } catch (err) {
      return err;
    }
  }
}
module.exports = select;
