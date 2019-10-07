let fs = require("fs");

class StockReport {
  readJson = () => {
    return JSON.parse(
      fs.readFileSync(
        "/home/mobicomp/BLabz/object_oriented/json_files/stock_report.json"
      )
    );
  };
  writeJson = convert => {
    return fs.writeFileSync(
      "/home/mobicomp/BLabz/object_oriented/json_files/stock_report.json",
      JSON.stringify(convert)
    );
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
  displaystock = () => {
    try {
      let jsfile = this.readJson();
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
}
module.exports = StockReport;
