const fs = require("fs");

class Ojct {
  constructor(name, weight, price) {
    (this.name = name), (this.weight = weight), (this.price = price);
  }
}

class JsonMethods {
  readJson = () => {
    return (jsonCon = JSON.parse(fs.readFileSync("../json_files/json.json")));
  };
  writeJson = jsonCon => {
    fs.writeFileSync("../json_files/json.json", JSON.stringify(jsonCon));
  };
  displayTotal = jfile => {
    try {
      if (this.isEmptyObject(jfile) == false) {
        throw "JSON is empty";
      }
      var total = 0;
      for (let i in jfile) {
        let all = jfile[i].price * jfile[i].weight;
        total += jfile[i].price * jfile[i].weight;
        console.log(
          `${jfile[i].name} of weight ${jfile[i].weight} kg of total amount ${all}`
        );
      }
      console.log(`total ${total} rs of stock remaining `);
    } catch (err) {
      console.log(err);
    }
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

  addobj = (name, weight, price) => {
    let obj = new Ojct(name, weight, price);
    this.readJson();
    const JsonFile = JSON.parse(fs.readFileSync("../json_files/json.json"));
    jsonCon.push(obj);
    fs.writeFileSync("../json_files/json.json", JSON.stringify(JsonFile));
  };

  deleteObj = opt => {
    try {
      const JsOnFile = JSON.parse(fs.readFileSync("../json_files/json.json"));
      if (this.isEmptyObject(JsOnFile) === false) {
        throw "it is an empty JSON";
      }
      for (let i in JsOnFile) {
        if (JsOnFile[i].name === opt) {
          JsOnFile.splice(i, 1);
          console.log(JsOnFile);
          // fs.writeFileSync("../json_files/json.json", JSON.stringify(JsOnFile));
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  searchAccount = name => {
    const Json = JSON.parse(fs.readFileSync("../json_files/json.json"));
    for (let i in Json) {
      if (Json[i].name === name) {
        console.log(`${name} is present in database`);
      }
    }
  };
}

module.exports = JsonMethods;

/*const jsfile = JSON.parse(fs.readFileSync("../json_files/inventory.json"));

let total = 0;
jsfile.forEach(ele => {
  let key = Object.keys(ele);
  key.forEach(keyEle => {
    ele[keyEle].forEach(val => {
      let cost = val.weight * val.price;
      total += cost;
      console.log(cost);
    });
  });
});
console.log(total);*/
