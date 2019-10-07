/***************************************************************************************************************
 *  Execution:  No
 *
 *  Purpose:logic to Determines fewest Notes to be returned for Vending Machine.
 *
 *  @author  Ganesh Chavan
 *  @version 1.0
 *  @since   28-08-2019
 *
 **************************************************************************************************************/
let index = 0;
let currencyAvailable = [2000, 500, 200, 100, 50, 20, 10, 5, 2, 1];
let txt = "";
function notesCount(amount) {
  try {
    if (typeof amount !== "number")
      throw "argument provided is not number or empty";
    if (amount < 1) throw false;
    if (index < currencyAvailable.length) {
      let remain = amount % currencyAvailable[index];
      let notes = parseInt(amount / currencyAvailable[index]);
      txt += `${notes} notes of ${currencyAvailable[index]} \n`;
      index++;
      notesCount(remain);
    }
    return txt;
  } catch (err) {
    return err;
  }
}
module.exports = notesCount;
