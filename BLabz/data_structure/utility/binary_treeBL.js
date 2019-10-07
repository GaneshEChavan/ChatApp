class Node {
  constructor(data) {
    this.data = data;
    this.right = null;
    this.left = null;
  }
}

class searchTree {
  constructor() {
    this.head = null;
  }

  addNode(val) {
    let temp = this.head;
    let node = new Node(val);
    if (this.head === null) {
      return (this.head = node);
    } else {
      let searchNull = function(temp) {
        if (val < temp.data) {
          if (temp.left === null) {
            return (temp.left = node);
          } else {
            return searchNull(temp.left);
          }
        } else {
          if (val > temp.data) {
            if (temp.right === null) {
              return (temp.right = node);
            } else {
              return searchNull(temp.right);
            }
          } else {
            return null;
          }
        }
      };
      searchNull(temp);
    }
  }
  search(val) {
    if (this.head.data === val) {
      console.log(`${val} is found`);
    } else {
      let temp = this.head;
      while (temp.data !== val && temp !== null) {
        if (val < temp.data) {
          temp = temp.left;
        } else {
          temp = temp.right;
        }
      }
      if (temp.data === val) {
        console.log(`${val} is found`);
      } else {
        console.log(`${val} not found`);
      }
    }
  }
}
module.exports = searchTree;
