const rl = require("readline").createInterface(process.stdin, process.stdout);
const fs = require("fs");
const JSONmethods = require("../oop_utility/json_methods");
let jFile = JSON.parse(fs.readFileSync("../json_files/json.json"));

let methods = new JSONmethods();

rl.question(
  "Enter <<1>> for display ,<<2>> for add new object,<<3>> for delete element  >",
  userValue => {
    choice = parseInt(userValue);
    switch (choice) {
      case 1:
        methods.displayTotal(jFile);
        rl.close();
        break;
      case 2:
        rl.question("give name of grain to add in json  >", uservalue => {
          let name = uservalue;
          rl.question("enter weight you have  >", uservalue => {
            let weight = parseInt(uservalue);
            rl.question("enter price  >", uservalue => {
              let price = parseInt(uservalue);
              methods.addobj(name, weight, price);
              rl.close();
            });
          });
        });
        break;
      case 3:
        rl.question(
          "Enter the name of object you want to delete  >",
          userValue => {
            let opted = userValue;
            methods.deleteObj(opted);
            rl.close();
          }
        );
        break;
      default:
        console.log("not appropriate option selected  >");
        rl.close();
        break;
    }
  }
);
