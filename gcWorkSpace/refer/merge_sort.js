let arr = [5, 1, 9, 11, 2];
function mergeSort(arr) {
  if (arr.length === 1) {
    return arr;
  }
  let midTerm = Math.floor(arr.length / 2);
  let left1 = arr.slice(0, midTerm);
  let right1 = arr.slice(midTerm);
  mergeSort(left1), mergeSort(right1);
  merge(left1, right1);
}
function merge(left, right) {
  let finalArray = [];
  while (left.length && right.length) {
    if (left[0] < right[0]) {
      finalArray.push(left.shift());
    } else {
      finalArray.push(right.shift());
    }
  }
  console.log(...finalArray, ...left, ...right);
}

mergeSort(arr);
