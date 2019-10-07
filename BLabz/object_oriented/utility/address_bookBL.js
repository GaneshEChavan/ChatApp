const fs = require("fs");

class Person {
  constructor(firstname, lastname, address, city, state, zip, number) {
    this._firstName = firstname;
    this._lastName = lastname;
    this._address = address;
    this._city = city;
    this._state = state;
    this._zip = zip;
    this._number = number;
  }
  get firstName() {
    return this._firstName;
  }
  set firstName(fname) {
    this._firstName = fname;
  }
  get lastName() {
    return this._lastName;
  }
  set lastName(lname) {
    this._lastName = lname;
  }
  get address() {
    return this._address;
  }
  set address(addrs) {
    this._address = addrs;
  }
  get city() {
    return this._city;
  }
  set city(cty) {
    this._city = cty;
  }
  get state() {
    return this._state;
  }
  set state(stat) {
    this._state = stat;
  }
  get zip() {
    return this._zip;
  }
  set zip(code) {
    this._zip = code;
  }
  get number() {
    return this._number;
  }
  set number(num) {
    this._number = num;
  }
}
class AddressBook {
  readJson = path => {
    return JSON.parse(fs.readFileSync(path));
  };
  writeJson = (path, convert) => {
    return fs.writeFileSync(path, JSON.stringify(convert));
  };
  isEmptyObject = Json => {
    for (let i in Json) {
      if (Json[i].hasOwnProperty("_firstName")) {
        return true;
      } else {
        return false;
      }
    }
  };
  mailingFormat = (dirName, fileName) => {
    try {
      let book = this.readJson(this.useExistingFile(dirName, fileName));
      if (this.isEmptyObject(book) === false) {
        throw "it is an empty JSON";
      }
      for (let i in book) {
        console.log(`            ${book[i]._firstName} ${book[i]._lastName}
            ${book[i]._address}, ${book[i]._city},
            ${book[i]._state} - ${book[i]._zip}
            Contact No : ${book[i]._number}
                                          `);
      }
    } catch (err) {
      console.log(err);
    }
  };
  addPerson = (
    dirName,
    fileName,
    fname,
    lname,
    adres,
    city,
    state,
    zip,
    num
  ) => {
    try {
      let book = this.readJson(this.useExistingFile(dirName, fileName));
      if (
        typeof fname !== "string" ||
        typeof lname !== "string" ||
        typeof adres !== "string" ||
        typeof city !== "string" ||
        typeof state !== "string" ||
        typeof zip !== "number" ||
        typeof num !== "number"
      )
        throw true;

      let newPerson = new Person(fname, lname, adres, city, state, zip, num);
      book.push(newPerson);
      this.writeJson(this.useExistingFile(dirName, fileName), book);
    } catch (err) {
      return err;
    }
  };
  deletePerson = (dirName, fileName, name) => {
    try {
      const book = this.readJson(this.useExistingFile(dirName, fileName));
      if (this.isEmptyObject(book) === false) throw "data is empty";
      if (typeof name !== "string") throw "invalid Input";
      if (name === undefined) throw "no argument passed";

      for (let i = 0; i < book.length; i++) {
        if (book[i]._firstName === name) {
          book.splice(i, 1);
          this.writeJson(this.useExistingFile(dirName, fileName), book);
        }
      }
    } catch (err) {
      return err;
    }
  };
  updateInfo = (dirName, fileName, name, adres, city, state, zip, num) => {
    try {
      const book = this.readJson(this.useExistingFile(dirName, fileName));
      if (this.isEmptyObject(book) === false) throw "data is empty";
      if (
        typeof name !== "string" ||
        typeof adres !== "string" ||
        typeof city !== "string" ||
        typeof state !== "string" ||
        typeof zip !== "number" ||
        typeof num !== "number"
      )
        throw true;

      for (let i = 0; i < book.length; i++) {
        if (book[i]._firstName === name) {
          book[i]._address = adres;
          book[i]._city = city;
          book[i]._state = state;
          book[i]._zip = zip;
          book[i]._number = num;
          this.writeJson(this.useExistingFile(dirName, fileName), book);
        } else {
          return console.log("Not registered in book");
        }
      }
    } catch (err) {
      return err;
    }
  };
  sortByLastName = (dirName, fileName) => {
    try {
      const book = this.readJson(this.useExistingFile(dirName, fileName));
      if (this.isEmptyObject(book) === false) throw "data is empty";

      for (let i = 1; i < book.length; i++) {
        let temp;
        for (let j = 0; j < i; j++) {
          if (book[j]._lastName > book[i]._lastName) {
            temp = book[j];
            book[j] = book[i];
            book[i] = temp;
          }
        }
      }
      this.writeJson(this.useExistingFile(dirName, fileName), book);
    } catch (err) {
      return err;
    }
  };
  sortByZip = (dirName, fileName) => {
    try {
      const book = this.readJson(this.useExistingFile(dirName, fileName));
      if (this.isEmptyObject(book) === false) throw "data is empty";

      for (let i = 1; i < book.length; i++) {
        let temp;
        for (let j = 0; j < i; j++) {
          if (book[j]._zip > book[i]._zip) {
            temp = book[j];
            book[j] = book[i];
            book[i] = temp;
          }
        }
      }
      this.writeJson(this.useExistingFile(dirName, fileName), book);
    } catch (err) {
      return err;
    }
  };
  createNewDirectory = dirName => {
    try {
      const dirnames = {
        commonFile: "/home/mobicomp/BLabz/object_oriented"
      };
      fs.mkdirSync(`${dirnames.commonFile}/${dirName}`);
    } catch (err) {
      return err;
    }
  };

  createNewFile = (dirName, fileName) => {
    try {
      const dirnames = {
        json: "/home/mobicomp/BLabz/object_oriented"
      };
      if (typeof fileName !== "string") throw "improper file name";
      if (
        fs.existsSync(`${dirnames.json}/${dirName}/${fileName}.json`) === true
      ) {
        console.log("File already exists");
      } else {
        fs.writeFileSync(`${dirnames.json}/${dirName}/${fileName}.json`);
      }
    } catch (err) {
      return err;
    }
  };

  useExistingFile = (dirName, fileName) => {
    try {
      const dirnames = {
        json: "/home/mobicomp/BLabz/object_oriented"
      };
      if (typeof fileName !== "string") throw "improper file name";
      if (
        fs.existsSync(`${dirnames.json}/${dirName}/${fileName}.json`) === true
      ) {
        return `${dirnames.json}/${dirName}/${fileName}.json`;
      } else {
        console.log("file does not exists...");
      }
    } catch (err) {
      return err;
    }
  };
}
module.exports = AddressBook;
