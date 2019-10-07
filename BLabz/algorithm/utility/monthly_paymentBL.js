/***************************************************************************************************************
 *  Execution:  No
 *
 *  Purpose:logic to calculate the simple and compound interest of provided inputs.
 *
 *  @author  Ganesh Chavan
 *  @version 1.0
 *  @since   28-08-2019
 *
 **************************************************************************************************************/
class interest {
  /*
   *method calculates compound interest
   */
  compoundInterest(amount, years, rate) {
    /*
     *used try-catch to handle exceptions
     */
    try {
      if (amount < 0 || years < 0 || rate < 0) throw "input must be positive";
      if (rate > 20) throw "usually interest rate is below 20%";
      let rateCalc = Math.pow(1 + rate / 100, years);
      let compoundInterest = amount * (rateCalc - 1);
      return `${compoundInterest.toFixed(2)} per year`;
    } catch (err) {
      return err;
    }
  }
  /*
   *method calculates simple interest
   */
  simpleInterest(amount, years, rate) {
    try {
      if (amount < 0 || years < 0 || rate < 0) throw "input must be positive";
      if (rate > 20) throw "usually interest rate is below 20%";
      let simpleInterest = (amount * years * rate) / 100;
      return `${simpleInterest.toFixed(2)}  per year`;
    } catch (err) {
      return err;
    }
  }
}
module.exports = interest;
