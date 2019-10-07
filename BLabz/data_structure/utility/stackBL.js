class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}
class stack {
  constructor() {
    this.head = null;
    this.cnt = 0;
  }
  push(val) {
    let node = new Node(val);
    if (this.head === null) {
      this.head = node;
      this.cnt++;
    } else {
      let temp = this.head;
      while (temp.next !== null) {
        temp = temp.next;
      }
      temp.next = node;
      this.cnt++;
    }
    return node;
  }
  pop() {
    let prev = null,
      temp = this.head;
    if (this.head === null) {
      this.cnt--;
    } else if (this.head.next === null) {
      this.head = null;
      this.cnt--;
    } else {
      while (temp.next !== null) {
        prev = temp;
        temp = temp.next;
      }
      prev.next = null;
      this.cnt--;
    }
  }
  peek() {
    let prev = null,
      peek,
      temp = this.head;
    if (this.head === null) {
      console.log("stack is empty");
      return;
    } else {
      while (temp !== null) {
        prev = temp;
        temp = temp.next;
      }
      peek = prev.data;
    }
    return console.log(peek);
  }
  isEmpty() {
    return this.head === null ? true : false;
  }
  size() {
    let temp = this.head,
      count = 0;
    while (temp.next !== null) {
      temp = temp.next;
      count++;
    }
    console.log(count);
  }
  display() {
    let temp = this.head,
      str = [];
    if (this.head === null) {
      return;
    }
    while (temp !== null) {
      str.push(temp.data);
      temp = temp.next;
    }
    console.log(str);
  }

  check_Exp() {
    if (this.cnt === 0) {
      console.log("Arithmatic expression is balanced");
    } else {
      console.log("Expression is unbalanced");
    }
  }
}
module.exports = stack;
