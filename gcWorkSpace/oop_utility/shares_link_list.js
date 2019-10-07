class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}
class linked_list {
  constructor() {
    this.head = null;
  }
  add_node(val) {
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
  display() {
    let temp = this.head;
    let str = [];
    while (temp != null) {
      str.push(temp.data);
      temp = temp.next;
    }
    console.log(str);
  }
  add_at_specific_pos(val, pos = 0) {
    let node = new Node(val);
    if (this.head === null || pos === 0) {
      node.next = this.head;
      this.head = node;
    } else {
      let prev = null,
        curr = this.head,
        count = 0;
      while (curr !== null && pos !== count) {
        prev = curr;
        curr = curr.next;
        count++;
      }
      prev.next = node;
      node.next = curr;
    }
  }
  delete_at_specific_pos(pos) {
    if (this.head === null) {
      console.log("linked list empty");
      return;
    }
    if (pos === 0) {
      console.log("deleted node -----> ", this.head.data);
      this.head = this.head.next;
    } else {
      let prev = null,
        curr = this.head,
        count = 0;
      while (curr !== null && pos !== count) {
        prev = curr;
        curr = curr.next;
        count++;
      }
      console.log("deleted node -----> ", (curr || {}).data || null);
      prev.next = (curr || {}).next || null;
    }
  }
  delete_specific_val(val) {
    if (this.head === null) {
      console.log("linked list empty");
      return;
    }
    if (this.head.data === val) {
      console.log("deleted node -----> ", this.head.data);
      this.head = this.head.next;
    } else {
      let prev = null,
        curr = this.head;
      while (curr !== null && curr.data !== val) {
        prev = curr;
        curr = curr.next;
      }
      console.log("deleted node -----> ", (curr || {}).data || null);
      prev.next = (curr || {}).next || null;
    }
  }
  isEmpty() {
    if (this.head === null) {
      console.log("list is empty");
      return;
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
  index(val) {
    let count = 0,
      temp = this.head;
    if (this.head === null) {
      console.log("list is empty");
    }
    while (temp.data !== val) {
      count++;
    }
    console.log(`index of item is ${count + 1}`);
  }
}

module.exports = linked_list;
