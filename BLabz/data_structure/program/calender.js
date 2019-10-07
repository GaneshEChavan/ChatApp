const day = require("../../algorithm/utility/day_of_weekBL");
const rl = require("readline-sync");
function calender() {
  let mahina = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let str = "";
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  let arr = [[], [], [], [], [], [], []];
  let month = rl.question("Enter the month >");
  let year = rl.question("Enter the year >");
  let dayOn = day(parseInt(month), parseInt(year));
  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < 7; j++) {
      if (i === 0) {
        arr[i].push(days[j]);
      }
    }

    // if (i === 0) {
    //   arr[i].push(str);
    // } else if (i !== 0) {
    //   days.forEach((ele, inx) => {
    //     if (ele === dayOn) {
    //       for (let k = 0; k < mahina[month - 1]; k++) {}
    //     }
    //   });
    // }
  }

  console.log(arr);
}
calender();
