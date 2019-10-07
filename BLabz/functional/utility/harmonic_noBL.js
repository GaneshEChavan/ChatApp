/***************************************************************************************************************
 *  Execution:  No
 *
 *  Purpose:  Calculates the harmonic number till user given limit.
 *
 *  @author  Ganesh Chavan
 *  @version 1.0
 *  @since   28-08-2019
 *
 **************************************************************************************************************/
/*
 *function to calculate harmonic number with exception handling.
 */
function harmonic(n) {
  try {
    if (typeof n !== "number") throw false;
    if (n < 1) throw "must positive";
    if (isNaN(n)) throw "not a number";
    let equal = 1;
    for (let i = 2; i < n; i++) {
      equal += 1 / i;
    }
    return equal;
  } catch (err) {
    return err;
  }
}
module.exports = harmonic;
