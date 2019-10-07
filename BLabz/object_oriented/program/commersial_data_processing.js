const rl = require("readline-sync");
const stockAccount = require("../utility/commersial_data_processingBL");

let dataProcessing = () => {
  let execute = new stockAccount();
  let choice = rl.question(
    `Enter 1 for display detailed report,
      2 for add new account, 
      3 for add no of shares, 
      4 for remove no of shares > `
  );

  switch (parseInt(choice)) {
    case 1: {
      execute.displaystock();
      break;
    }
    case 2: {
      let shareName = rl.question(
        "Enter the name of share you want to create account of  >"
      );
      let shareCount = rl.question("Enter the number of shares  >");
      let sharePrice = rl.question("Enter the price of share  >");
      execute.addAccount(shareName, parseInt(shareCount), parseInt(sharePrice));
      break;
    }
    case 3: {
      execute.accountNames();
      let name = rl.question(
        "Enter name of account u want to add shares from above  >"
      );
      let shareAdd = rl.question("Enter no of shares you want to add  >");
      execute.addShares(name, parseInt(shareAdd));
      break;
    }
    case 4: {
      execute.accountNames();
      let Name = rl.question(
        "Enter name of account u want to remove shares from above  >"
      );
      let shareRemove = rl.question("Enter no of shares you want to remove  >");
      execute.removeShares(Name, parseInt(shareRemove));
      break;
    }
  }
};
dataProcessing();
