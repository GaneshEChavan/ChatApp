function find_out_prime() {
  function check_fun(val) {
    for (let i = 2; i < val / 2; i++) {
      if (val % i === 0) {
        return false;
      }
    }
    return true;
  }
  let array = [];
  for (let i = 0; i < 10; i++) {
    let col = [];
    for (let j = 100 * i; j < 100 * (i + 1); j++) {
      if (j % 2 !== 0 && check_fun(j)) {
        col.push(j);
      }
    }
    array.push(col);
  }
  return array;
}
module.exports = find_out_prime;
