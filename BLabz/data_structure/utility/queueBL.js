class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}
class Queue {
  constructor() {
    this.head = null;
  }

  enqueue(val) {
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
  }

  dequeue() {
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

  isEmpty() {
    if (this.head === null) {
      console.log("list is empty");
      return;
    }
  }

  display() {
    let temp = this.head;
    let str = [];
    while (temp !== null) {
      str.push(temp.data);
      temp = temp.next;
    }
    console.log(str);
  }
}
module.exports = Queue;
