function euclidian(x1, y1, x2, y2) {
  try {
    if (
      typeof x1 !== "number" ||
      typeof x2 !== "number" ||
      typeof y1 !== "number" ||
      typeof y2 !== "number"
    )
      throw false;
    if (x1 < 1 || x2 < 1 || y1 < 1 || y2 < 1) throw "give positive values only";
    if (isNaN(x1) || isNaN(x2) || isNaN(y1) || isNaN(y2)) throw "not a number";

    let distance = Math.sqrt(Math.pow(y1 - x1, 2) + Math.pow(y2 - x2, 2));
    return `linear distance between two points is ${distance}`;
  } catch (err) {
    return err;
  }
}
module.exports = euclidian;
