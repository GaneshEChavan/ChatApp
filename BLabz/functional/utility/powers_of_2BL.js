function powers(num) {
  try {
    if (typeof num !== "number") throw false;
    if (num < 0) throw "number must be positive";
    let txt = "";
    for (let i = 0; i < num; i++) {
      txt += `${Math.pow(2, i)}, `;
    }
    return txt;
  } catch (err) {
    return err;
  }
}
module.exports = powers;
