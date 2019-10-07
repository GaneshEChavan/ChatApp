const fs = require("fs");
const stockMethod = require("../oop_utility/json_methods");
const JsonFile = JSON.parse(fs.readFileSync("../json_files/stock.json"));

let readStock = new stockMethod();

readStock.displaystock(JsonFile);
