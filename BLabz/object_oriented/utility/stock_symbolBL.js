const stack = require("../../data_structure/utility/stackBL");
const data_process = require("../utility/commersial_data_processingBL");
let data = new data_process();

addToStack = () => {
  const stock = this.readJson(
    "/home/mobicomp/BLabz/object_oriented/json_files/symbol_stock.json"
  );
  let stak = new stack();

  for (let i in stock) {
    stak.push(stock[i]);
  }
  stak.display();
  console.log(">>>>>>added to stack<<<<<<<");
  // let remove = rl.question("Enter the name of share u want to delete  >");
  // stak.delete_object(remove);
  stak.display();
};

module.exports = StockSymbol;
// let symbol = new StockSymbol();
// symbol.displaystock();
// symbol.addAccount("numeroUno", 12, 100);
