/***************************************************************************************************************
 *  Execution:  node anagram.js
 *
 *  Purpose: takes user input add in tree and search for user input within tree
 *
 *  @author  Ganesh Chavan
 *  @version 1.0
 *  @since   28-08-2019
 *
 **************************************************************************************************************/
/*
 *import function from utility
 */
const bTree = require("../utility/binary_treeBL");
/*
 * readline-sync is blocking readline method
 */
const rl = require("readline-sync");

let num = rl.question("Enter the numbers to add in search tree  >");
let tree = new bTree();
let list = num.split(",");
/*
 *forEach method is used to create linked lists
 */
list.forEach(ele => {
  tree.addNode(ele);
});
console.log(tree);
let chk = rl.question("Enter the number to search  >");
tree.search(chk);
