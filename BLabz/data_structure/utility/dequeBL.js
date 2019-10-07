class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}
class dequeue {
  constructor() {
    this.head = null;
  }
  addFront(val) {
    let node = new Node(val);
    if (this.head === null) {
      this.head = node;
    } else {
      node.next = this.head;
      this.head = node;
    }
  }
  addLast(val) {
    let node = new Node(val);
    if (this.head === null) {
      this.head = node;
    } else {
      let temp = this.head;
      while (temp.next !== null) {
        temp = temp.next;
      }
      temp.next = node;
    }
    return node;
  }
  removeFront() {
    let temp = this.head;
    if (this.head === null) {
      console.log("queue is empty");
      return;
    }
    if (this.head.next === null) {
      this.head === null;
    } else {
      this.head = temp.next;
      temp = null;
    }
  }
  removeLast() {
    let prev = null,
      temp = this.head;
    if (this.head === null) {
      console.log("stack is empty");
      return;
    } else {
      while (temp.next !== null) {
        prev = temp;
        temp = temp.next;
      }
      prev.next = null;
    }
  }
  display() {
    let temp = this.head;
    let arr = [];
    while (temp !== null) {
      arr.push(temp.data);
      temp = temp.next;
    }
    console.log(arr);
  }
  check() {
    if (this.head === null || this.head.next === null) {
      return;
    } else {
      return true;
    }
  }
}
module.exports = dequeue;
