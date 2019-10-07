function check(arr) {
  try {
    if (typeof arr !== "object") throw false;
    if (arr.length === 0) throw "array provided is empty";
    for (let i = 0; i < arr.length - 2; i++) {
      for (let j = 1; j < arr.length - 1; j++) {
        for (let k = 2; k < arr.length; k++) {
          if (arr[i] + arr[j] + arr[k] == 0) {
            return `${arr[i]},${arr[j]},${arr[k]}`;
          }
        }
      }
    }
  } catch (err) {
    return err;
  }
}
module.exports = check;
