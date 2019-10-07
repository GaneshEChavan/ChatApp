/***************************************************************************************************************
 *  Execution:  No
 *
 *  Purpose: utility file for data structure
 *
 *  @author  Ganesh Chavan
 *  @version 1.0
 *  @since   28-08-2019
 *
 **************************************************************************************************************/
/*
 *imported readline-sync module, file system module
 */
const rl = require("readline-sync");
const fs = require("fs");
const deque = require("./dequeBL");
const queue = require("./queueBL");
const stack = require("./stackBL");
const unordered = require("./unordered_listBL");
const ordered = require("./ordered_listBL");
class utilFunctions {
  /*
   *function for checking palindrome condition in linked list
   */
  palindromeChecker() {
    let dq = new deque();
    let check = rl.question(
      "Enter the word you want to test for palindrome  >"
    );
    let str = check.split("");
    for (let u = 0; u < str.length; u++) {
      dq.addLast(str[u]);
    }
    dq.display();
    let k = 0,
      j = str.length - 1;
    for (let i = 0; i <= str.length; i++) {
      if (str[k] === str[j]) {
        dq.removeLast();
        dq.removeFront();
        dq.display();
        j--;
        k++;
        i += 2;
      } else {
        console.log("not palindrome");
        break;
      }
    }
    if (!dq.check()) {
      console.log("is a palindrome");
    }
  }

  /*
   *function for writing ordered list in text file using linked list
   */
  orderdList() {
    let regx = /,/gi;
    let userInput = rl.question("Enter the numbers you want to add in list  >");
    let data = userInput.replace(regx, " ").split(" ");
    let arr = [];
    let ol = new ordered();
    data.forEach(ele => {
      arr.push(parseInt(ele));
    });
    arr.forEach(element => {
      ol.addNode(element);
    });
    let file = ol.appendData();
    fs.writeFileSync("../txt_files/ordered_list.txt", file);
  }

  /*
   *function for adding or deleting value from linked list and write it back to text file
   */
  add_delete = () => {
    const text = fs.readFileSync("../txt_files/unordered_lits.txt", "utf8"); //>>blocking function will proceed after reading file
    let ll = new unordered();
    let txt = text.trim().split(" ");
    let addTxt = () => {
      txt.forEach(element => {
        ll.add_node(element);
      });
      ll.display();
    };
    addTxt(txt);

    let check = rl.question("enter the text you want to check from list  >");
    if (ll.search(check) === true) {
      ll.delete_specific_val(check);
      ll.display();
      let data = ll.appendData();
      fs.writeFileSync("../txt_files/unordered_lits.txt", data);
    } else {
      ll.add_node(check);
      ll.display();
      let data = ll.appendData();
      fs.writeFileSync("../txt_files/unordered_lits.txt", data);
    }
  };

  /*
   *function for bank cash counter
   */
  cashCounter() {
    let que = new queue();
    let limit = rl.question("Enter the Queue Limit  >");
    for (let j = 1; j <= limit; j++) {
      que.enqueue(j);
      que.display();
    }

    let bankBalance = 10000;
    for (let i = 0; i <= limit; i++) {
      let choice = rl.question("You want to deposit the money Y/N");
      if (choice === "y") {
        let amount = rl.question("Enter the amount you want to deposit  >");
        bankBalance += parseInt(amount);
        que.dequeue();
        que.display();
        console.log(`balance is ${bankBalance}`);
      } else if (choice === "n") {
        let require = rl.question("Enter the amount you want to Withdraw  >");
        if (require > bankBalance) {
          console.log(`${bankBalance}rs are available`);
        } else {
          bankBalance -= require;
          que.dequeue();
          que.display();
          console.log(`balance is ${bankBalance}`);
        }
      }
    }
  }

  /*
   *function for checking the balanced paranthesis
   */
  balancedParantheses() {
    fs.readFile("../txt_files/expression.txt", "utf8", function(err, data) {
      if (err) {
        throw error;
      }
      let arr = data.split("");
      let stk = new stack();
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] === "(") {
          stk.push("(");
        } else if (arr[i] === ")") {
          stk.pop();
        }
        stk.display();
      }
      stk.check_Exp();
    });
  }

  /*
   *function for calculating hash values in hashTable function
   */
  calHash(elem, leng) {
    let ele = parseInt(elem);
    let arrLength = parseInt(leng);
    return ele % arrLength;
  }

  /*
   *function for making the hash table
   */
  hashTable() {
    let arra = [],
      len = 11,
      test_arr = fs.readFileSync("../txt_files/hash_table.txt", "utf8");
    let regx = /,/gi;
    let data = test_arr.replace(regx, " ").split(" ");
    data.forEach(ele => {
      arra.push(parseInt(ele));
    });
    let arr = [];
    for (let i = 0; i < len; i++) {
      arr.push(new ordered());
    }

    arra.forEach(element => {
      let hash = this.calHash(element, len);
      arr[hash].addNode(element);
    });
    arr.forEach(node => {
      node.display();
    });
    let user_input = rl.question(
      "Enter the number you want to delete or add  >"
    );
    let ip = parseInt(user_input);
    let hash = this.calHash(user_input, len);
    if (arr[hash].search(ip) === true) {
      arr[hash].delete(ip);
    } else {
      arr[hash].addNode(ip);
    }
    //console.log(arr[hash]);
    arr.forEach(node => {
      node.display();
    });
  }

  /*
   *function for checking the anagram condition in prime number problem
   */
  anagram(var1, var2) {
    let count = 0;
    let exm1 = var1
      .toString()
      .split("")
      .sort();
    let exm2 = var2
      .toString()
      .split("")
      .sort();
    if ((exm1.length = exm2.length)) {
      for (let i = 0; i < exm1.length; i++) {
        if (exm1[i] === exm2[i]) {
          count++;
        }
      }
    }
    if (count === exm1.length) {
      return true;
    }
  }
}
module.exports = utilFunctions;
