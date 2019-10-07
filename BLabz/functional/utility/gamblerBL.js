function gambler(stak, gol) {
  try {
    if (typeof stak !== "number" || typeof gol !== "number") throw false;
    if (stak < 1 || gol < 1) throw "provided negative values";
    if (isNaN(stak) || isNaN(gol)) throw "not a number";
    let [stk, goal] = [stak, gol];
    while (stk !== goal && stk !== 0) {
      let random = Math.random() * 1;
      if (random < 0.5) {
        stk++;
      } else {
        stk--;
      }
    }
    if (stk === goal) {
      return "winner...!";
    } else {
      return "looser...!";
    }
  } catch (err) {
    return err;
  }
}
module.exports = gambler;
