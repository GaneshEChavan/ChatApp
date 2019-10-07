function quadra(a, b, c) {
  try {
    if (typeof a !== "number") throw false;
    if (typeof b !== "number") throw false;
    if (typeof c !== "number") throw false;

    let sqt = Math.pow(b, 2) - 4 * a * c;
    if (sqt < 0) {
      sqt *= -1;
      let sqrtTerm = Math.sqrt(sqt);
      return `((${-b})+${sqrtTerm}i/${2 * a}) and ((${-b})-${sqrtTerm}i/${2 *
        a}) are roots`;
    } else {
      let sqrtTerm = Math.sqrt(sqt);
      let root1 = (-b + sqrtTerm) / (2 * a);
      let root2 = (-b - sqrtTerm) / (2 * a);
      return `${root1} and ${root2} are roots`;
    }
  } catch (err) {
    return err;
  }
}
module.exports = quadra;
