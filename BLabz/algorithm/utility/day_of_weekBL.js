/***************************************************************************************************************
 *  Execution:  No
 *
 *  Purpose:logic to determine day of the week that date falls on with exception handling.
 *
 *  @author  Ganesh Chavan
 *  @version 1.0
 *  @since   28-08-2019
 *
 **************************************************************************************************************/
var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
function dayOfWeek(D, M, Y) {
  /*
   *used try-catch to handle exceptions
   */
  try {
    if (typeof D !== "number") throw false;
    if (typeof M !== "number") throw false;
    if (typeof Y !== "number") throw false;
    if (D > 32 || M > 12) throw "Invalid inputs";
    if (D < 1 || M < 1 || Y < 1) throw "values must be non-negative";
    if (D < 32 && M < 13) {
      y = Y - parseInt((14 - M) / 12);
      x = y + parseInt(y / 4) - parseInt(y / 100) + parseInt(y / 400);
      m = M + 12 * parseInt((14 - M) / 12) - 2;
      d = (D + x + parseInt(31 * (m / 12))) % 7;
      let day = [days[d], d];
      return day;
    } else {
      /*
       *throws the error if condition is not satisfied
       */
      throw "no proper inputs";
    }
    /*
     * thrown error catched here
     */
  } catch (err) {
    return err;
  }
}
module.exports = dayOfWeek;
