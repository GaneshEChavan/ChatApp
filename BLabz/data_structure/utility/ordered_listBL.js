class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}
class orderedList {
  constructor() {
    this.head = null;
  }
  addNode(val) {
    try {
      if (val === undefined) throw "Error in providing value";
      if (typeof val === "object") throw "value cant be object";
      let node = new Node(val);
      if (this.head === null) {
        this.head = node;
      } else if (this.head.data > val) {
        node.next = this.head;
        this.head = node;
      } else {
        let prev = null,
          curr = this.head;
        while (curr !== null && curr.data < val) {
          prev = curr;
          curr = curr.next;
        }
        node.next = curr;
        prev.next = node;
      }
    } catch (err) {
      return err;
    }
  }

  isEmpty() {
    if (this.head === null) {
      return true;
    }
  }

  delete(val) {
    try {
      if (this.isEmpty() === true) throw true;
      if (val === undefined) throw "Error in providing value";
      if (this.head.data === val) {
        this.head = this.head.next;
      } else {
        let prev = null,
          curr = this.head;
        while (curr.next !== null && curr.data !== val) {
          prev = curr;
          curr = curr.next;
        }
        prev.next = curr.next;
      }
    } catch (err) {
      return err;
    }
  }
  search(val) {
    try {
      if (this.isEmpty() === true) throw "nothing to search";
      let prev = null,
        curr = this.head;
      while (curr.next !== null && curr.data !== val) {
        prev = curr;
        curr = curr.next;
      }
      return curr.data === val ? true : false;
    } catch (err) {
      return err;
    }
  }
  size() {
    let count = 0;
    let temp = this.head;
    if (this.head === null) {
      console.log("list size is 0");
      return;
    }
    while (temp !== null) {
      temp = temp.next;
      count++;
    }
    return console.log(`list size is ${count}`);
  }
  appendData() {
    try {
      if (this.isEmpty() === true) throw "no data to append";
      let str = "";
      if (this.head === null) {
        console.log("list is empty");
        return;
      }
      let temp = this.head;
      while (temp !== null) {
        str += temp.data + " ";
        temp = temp.next;
      }
      return str;
    } catch (err) {
      return err;
    }
  }
  display() {
    try {
      // console.log("----112");
      if (this.isEmpty() === true) throw "Nothing to display";
      let temp = this.head;
      let arr = [];
      while (temp !== null) {
        arr.push(temp.data);
        temp = temp.next;
      }
      console.log(arr);
    } catch (err) {
      return err;
    }
  }
}
module.exports = orderedList;
