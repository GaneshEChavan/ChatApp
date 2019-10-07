const fs = require("fs");
class inventoryManagement {
  readJson = () => {
    return JSON.parse(fs.readFileSync("../json_files/inventory.json"));
  };
  totalInventory = () => {
    let data = this.readJson();
    let total = 0;
    for (let i in data) {
      data[i].forEach(grain => {
        total += grain.weight * grain.price;
        // console.log(
        //   `${grain.name} is remaining of ${grain.weight * grain.price}.RS`
        // );
      });
    }
    console.log(`${total}.RS is total amount`);
  };
}
module.exports = inventoryManagement;
