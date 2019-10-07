const rl = require("readline").createInterface(process.stdin, process.stdout);
const accountBL = require("../oop_utility/stock_accBL");
const fs = require("fs");

let stkacc = new accountBL();
rl.question(
  "Enter <<1>> for display shares info,<<2>> for add account,<<3>> for delete account,<<4>> for update account info  >",
  userValue => {
    choice = parseInt(userValue);

    switch (choice) {
      case 1: {
        let jf = JSON.parse(fs.readFileSync("../json_files/stock.json"));
        stkacc.displaystock(jf);
        rl.close();
        break;
      }
      case 2: {
        rl.question(
          "Enter the Name of Share account u want to add  >",
          uservalue => {
            name = uservalue;
            rl.question(
              "Enter the number of shares of this account  >",
              userValue => {
                shares = parseInt(userValue);
                rl.question(
                  "Enter the price of each share of this account  >",
                  userValue => {
                    price = parseInt(userValue);
                    stkacc.addAccount(name, shares, price);
                    rl.close();
                  }
                );
              }
            );
          }
        );
        break;
      }
      case 4: {
        rl.question("enter name of account to be update", userValue => {
          name = userValue;
          rl.question("enter number of shares want to add ", userValue => {
            shares = parseInt(userValue);
            stkacc.updateAccount(name, shares);
            rl.close();
          });
        });
      }
    }
  }
);

/*let a = 1;
let b = 2;

let add = () => {
  return [a + b, b * a];
};
console.log(add(a, b));*/
