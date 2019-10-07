function coupon_generate(coupons) {
  try {
    if (typeof coupons !== "number") throw false;
    if (coupons < 1) throw "not valid input";
    let array = [];
    if (coupons > 100) {
      return "invalid input";
    } else {
      for (let i = 0; i < coupons; i++) {
        let num = parseInt(Math.random() * 100);
        if (array.length == 0) {
          array.push(num);
        } else if (array.includes(num) == true) {
          i--;
        } else {
          array.push(num);
        }
      }
    }
    return array;
  } catch (err) {
    return err;
  }
}
module.exports = coupon_generate;
