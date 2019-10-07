let head = [
  {
    name: "Birla",
    shares: 10,
    price: 1840
  },
  {
    name: "reva",
    shares: 15,
    cost: 6542
  }
];

// let nm = "Birla";
// let delet = nm => {
//   //let count = 0;
//   for (let i in head) {
//     if (head[i].name === nm) {
//       head.splice(i, 1);
//       console.log(head);
//     }
//   }
// };
//delet(nm);
let name = "reva";
function updateAccount(name, addshare) {
  //const stock = JSON.parse(fs.readFileSync("../json_files/stock.json"));
  for (let i = 0; i < head.length; i++) {
    if (head[i].name === name) {
      head[i].shares += addshare;
      //  fs.writeFileSync("../json_files/stock.json", JSON.stringify(stock));
      console.log(head);
    }
  }
}
updateAccount(name, 5);
