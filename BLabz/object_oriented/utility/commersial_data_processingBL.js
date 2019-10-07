let fs = require("fs");

class NewAccount {
  constructor(name, shares, price, symbol, date) {
    (this.name = name),
      (this.shares = shares),
      (this.price = price),
      (this.symbol = symbol),
      (this.date = date);
  }
}
class StockAccount {
  readJson = path => {
    return JSON.parse(fs.readFileSync(path));
  };
  writeJson = (path, convert) => {
    return fs.writeFileSync(path, JSON.stringify(convert));
  };
  isEmptyObject = Json => {
    for (let i in Json) {
      if (Json[i].hasOwnProperty("name")) {
        return true;
      } else {
        return false;
      }
    }
  };
  accountNames = () => {
    try {
      let jsfile = this.readJson(
        "/home/mobicomp/BLabz/object_oriented/json_files/symbol_stock.json"
      );
      if (jsfile.length === 0) throw "json is empty";
      if (this.isEmptyObject(jsfile) === false) throw "No data";

      for (let i in jsfile) {
        console.log(
          jsfile[i].name + " " + "> shares-->" + " " + jsfile[i].shares
        );
      }
    } catch (err) {
      return err;
    }
  };
  displaystock = () => {
    try {
      let jsfile = this.readJson(
        "/home/mobicomp/BLabz/object_oriented/json_files/symbol_stock.json"
      );
      if (jsfile.length === 0) throw "json is empty";
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
      console.log(`total cost of stock is ${total} Rs.`);
    } catch (err) {
      console.log(err);
    }
  };

  addAccount = (
    name,
    noOfShares,
    priceOfEach,
    symbol = "buy",
    date = format
  ) => {
    try {
      const stock = this.readJson(
        "/home/mobicomp/BLabz/object_oriented/json_files/symbol_stock.json"
      );
      if (stock.length === 0) throw "json is empty";
      if (
        typeof name !== string ||
        typeof noOfShares !== "number" ||
        typeof priceOfEach !== "number"
      )
        throw false;
      if (this.isEmptyObject(stock) === false) throw true;
      let newAcc = new NewAccount(name, noOfShares, priceOfEach, symbol, date);
      stock.push(newAcc);
      this.writeJson(
        "/home/mobicomp/BLabz/object_oriented/json_files/symbol_stock.json",
        stock
      );
    } catch (err) {
      return err;
    }
  };

  addShares = (name, addshare) => {
    try {
      const stock = this.readJson(
        "/home/mobicomp/BLabz/object_oriented/json_files/symbol_stock.json"
      );
      if (this.isEmptyObject(stock) === false) throw "data is empty";

      for (let i = 0; i < stock.length; i++) {
        if (stock[i].name === name) {
          stock[i].shares += addshare;
          stock[i].symbol = "buy";
          stock[i].date = `${format}`;
          this.writeJson(
            "/home/mobicomp/BLabz/object_oriented/json_files/symbol_stock.json",
            stock
          );
        }
      }
    } catch (err) {
      return err;
    }
  };

  removeShares = (name, removeshare) => {
    try {
      const stock = this.readJson(
        "/home/mobicomp/BLabz/object_oriented/json_files/symbol_stock.json"
      );
      if (this.isEmptyObject(stock) === false) throw "data is empty";
      for (let i = 0; i < stock.length; i++) {
        if (stock[i].name === name) {
          if (stock[i].shares > removeshare) {
            stock[i].shares -= removeshare;
            stock[i].symbol = "sell";
            stock[i].date = `${format}`;
            this.writeJson(
              "/home/mobicomp/BLabz/object_oriented/json_files/symbol_stock.json",
              stock
            );
          } else {
            throw "unable to remove";
          }
        }
      }
    } catch (err) {
      return err;
    }
  };
}
module.exports = StockAccount;
// let sa = new StockAccount();
// sa.accountNames();
