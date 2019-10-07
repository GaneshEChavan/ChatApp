const fs = require("fs");
class NewAccount {
  constructor(name, shares, cost) {
    (this.name = name), (this.shares = shares), (this.cost = cost);
  }
}
class StockAccount {
  isEmptyObject = Json => {
    for (let i in Json) {
      if (Json[i].hasOwnProperty("name")) {
        return true;
      } else {
        return false;
      }
    }
  };
  displaystock = jsfile => {
    try {
      if (this.isEmptyObject(jsfile) === false) {
        throw "it is an empty JSON";
      }
      var total = 0;
      for (let i in jsfile) {
        let all = jsfile[i].price * jsfile[i].shares;
        total += jsfile[i].price * jsfile[i].shares;
        console.log(
          ` ${jsfile[i].shares} shares of ${jsfile[i].name} company ,
             price ${jsfile[i].price} of total amount ${all}`
        );
      }
      console.log(`total ${total} rs of stock remaining `);
    } catch (err) {
      console.log(err);
    }
  };

  addAccount = (name, noOfShares, priceOfEach) => {
    const stock = JSON.parse(fs.readFileSync("../json_files/stock.json"));
    let newAcc = new NewAccount(name, noOfShares, priceOfEach);
    stock.push(newAcc);
    fs.writeFileSync("../json_files/stock.json", JSON.stringify(stock));
  };

  updateAccount = (name, addshare) => {
    const stock = JSON.parse(fs.readFileSync("../json_files/stock.json"));
    for (let i = 0; i < stock.length; i++) {
      if (stock[i].name === name) {
        stock[i].shares = shares + addshare;
        fs.writeFileSync("../json_files/stock.json", JSON.stringify(stock));
      }
    }
  };
}

module.exports = StockAccount;
