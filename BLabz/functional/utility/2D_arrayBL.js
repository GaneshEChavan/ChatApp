function twoDArray(rows, columns) {
  try {
    if (typeof rows !== "number" || typeof columns !== "number") throw false;
    if (rows < 1 || columns < 1) throw "inputs must positive";
    let count = 0;
    let array = [[], []];
    let txt = "";
    for (var i = 0; i < rows; i++) {
      for (var j = 0; j < columns; j++) {
        txt += `${(array[[i][j]] = count++)}`;
      }
      txt += "\n";
    }
    return txt;
  } catch (err) {
    return err;
  }
}
module.exports = twoDArray;
