const anagramLogic = require("../utility/utility_bunch");

function find_out_anagram() {
  let anagram = new anagramLogic();
  function check_fun(val) {
    for (let i = 2; i < val / 2; i++) {
      if (val % i === 0) {
        return false;
      }
    }
    return true;
  }

  let a = [],
    b = [];
  for (let i = 0; i < 10; i++) {
    let col = [];
    for (let j = 100 * i; j < 100 * (i + 1); j++) {
      if (j % 2 !== 0 && check_fun(j)) {
        col.push(j);
      }
    }
    a.push(col);
  }
  for (let x = 0; x < 10; x++) {
    let arr = a[x],
      c = [];
    for (let y = 0; y < arr.length - 1; y++) {
      for (let z = y + 1; z < arr.length; z++) {
        if (anagram.anagram(arr[y], arr[z]) === true) {
          c.push(arr[y]);
          c.push(arr[z]);
        }
      }
    }
    b.push(c);
  }
  return b;
}
module.exports = find_out_anagram;
