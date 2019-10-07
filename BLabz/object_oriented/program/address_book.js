const rl = require("readline-sync");
const adresBook = require("../utility/address_bookBL");

let operations = () => {
  let select = rl.question(
    `>1< for create new directory
    >2< for create new file
    >3< to choose existing directory and file `
  );
  let book = new adresBook();
  switch (parseInt(select)) {
    case 1: {
      let dirName = rl.question("Enter the directory new name of directory >");
      book.createNewDirectory(dirName);
      break;
    }
    case 2: {
      let dirname = rl.question("Enter the name of directory want to use >");
      let filename = rl.question("Enter file name >");
      book.createNewFile(dirname, filename);
      break;
    }
    case 3: {
      let dirname = rl.question("Enter the name of directory want to use >");
      let filename = rl.question("Enter file name >");
      // book.useExistingFile(dirname, filename);

      let choice = rl.question(`  >1< for add person info
  >2< for remove person info
  >3< to update existing person information
  >4< to sort the book by last name
  >5< to sort the book by zip
  >6< to display each person info in mailing format >`);
      switch (parseInt(choice)) {
        case 1: {
          let book = rl.question("Enter first name >");
          let lname = rl.question("Enter last name >");
          let adrs = rl.question("Enter  permanant address >");
          let cty = rl.question("Enter city name>");
          let stat = rl.question("Enter state name >");
          let zip = rl.question("Enter city pincode >");
          let num = rl.question("Enter mobile number >");
          book.addPerson(
            dirname,
            filename,
            fname,
            lname,
            adrs,
            cty,
            stat,
            parseInt(zip),
            parseInt(num)
          );
          break;
        }
        case 2: {
          let name = rl.question("Enter the name want to delete information >");
          book.deletePerson(name);
          break;
        }
        case 3: {
          let name = rl.question("Name to edit information of >");
          let adrs = rl.question("Enter  permanant address >");
          let cty = rl.question("Enter city name >");
          let stat = rl.question("Enter state name >");
          let zip = rl.question("Enter city pincode >");
          let num = rl.question("Enter mobile number >");
          book.updateInfo(name, adrs, cty, stat, parseInt(zip), parseInt(num));
          break;
        }
        case 4: {
          book.sortByLastName();
          break;
        }
        case 5: {
          book.sortByZip();
          break;
        }
        case 6: {
          book.mailingFormat(dirname, filename);
          break;
        }
      }
    }
  }
};

operations();
