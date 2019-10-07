/***************************************************************************************************************
 *  Execution:  node unordered_list.js
 *
 *  Purpose: Input a string from text file and add each word in linked list then re-write the text file.
 *
 *  @author  Ganesh Chavan
 *  @version 1.0
 *  @since   28-08-2019
 *
 **************************************************************************************************************/

/*
//>>>>>> its an non-blocking method for reading the file which consist a callback function<<<<<<

fs.readFile("../txt_files/test.txt", "utf8", function(err, data) {
  if (err) {
    throw err;
  }
  console.log(data);
});

*/

/*
 *import function from utility
 */
const utility = require("../utility/utility_bunch");

let util = new utility();
util.add_delete();
