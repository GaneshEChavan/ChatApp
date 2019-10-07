/*
 *node class has constructor to create new instance of node, it contains data and address of next node.
 */
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}
class linked_list {
  constructor() {
    this.head = null; //>> for every new link list has its head value null
  }

  /*
   * method used to add new node at last of existing list
   */

  add_node(val) {
    /*
     *created new instance of Node object
     */
    try {
      if (val === undefined) throw "Error in providing value";
      let node = new Node(val);
      if (this.head === null) {
        this.head = node; //>> adds node if list is empty
      } else {
        let temp = this.head; //>> we cant traverse head so temp refers to head and temp will traverse over list
        while (temp.next !== null) {
          temp = temp.next;
        }
        temp.next = node; //>> adds new node at last of list
      }
    } catch (err) {
      return err;
    }
  }

  /*
   *method used to display the link list
   */

  display() {
    try {
      if (this.isEmpty() === true) throw "Nothing to display";
      let temp = this.head;
      let str = [];
      while (temp != null) {
        str.push(temp.data);
        temp = temp.next;
      }
      console.log(str);
    } catch (err) {
      return err;
    }
  }

  displayObj() {
    let temp = this.head;
    let strn = [];
    while (temp !== null) {
      strn.push(temp.data.name);
      temp = temp.next;
    }
    console.log(strn);
  }
  /*
   * method used to add node at specific position
   */

  add_at_specific_pos(val, pos = 0) {
    try {
      if (val === undefined) throw "Error in providing value";
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
    } catch (err) {
      return err;
    }
  }

  /*
   *method used to delete node at specific position
   */

  delete_at_specific_pos(pos) {
    try {
      if (this.isEmpty() === true) throw "list is empty";
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
    } catch (err) {
      return err;
    }
  }

  /*
   * method used to delete specific node of given value
   */

  delete_specific_val(val) {
    try {
      if (this.isEmpty() === true) throw true;
      if (val === undefined) throw "Error in providing value";
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
    } catch (err) {
      return err;
    }
  }

  delete_object(val) {
    try {
      if (this.isEmpty() === true) throw true;
      if (val === undefined) throw "Error in providing value";
      if (this.head.data.name === val) {
        console.log("deleted node -----> ", this.head.data);
        this.head = this.head.next;
      } else {
        let prev = null,
          curr = this.head;
        while (curr !== null && curr.data.name !== val) {
          prev = curr;
          curr = curr.next;
        }
        console.log("deleted node -----> ", (curr || {}).data || null);
        prev.next = (curr || {}).next || null;
      }
    } catch (err) {
      return err;
    }
  }

  //>> check for list is empty or not
  isEmpty() {
    if (this.head === null) {
      return true;
    }
  }
  //>> shows the size of link list
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
  //>> gives the index number of node of given value
  index(val) {
    try {
      if (this.isEmpty() === true) throw "list is empty";
      let count = 0,
        temp = this.head;
      while (temp.data !== val) {
        count++;
        temp = temp.next;
      }
      console.log(`index of item is ${count + 1}`);
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

  appendData() {
    try {
      if (this.isEmpty() === true) throw "list is already empty";

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
}

module.exports = linked_list;
// let ul = new linked_list();
// ul.add_node({ name: "reliance", shares: 15, price: 1500 });
// ul.add_node({ name: "H & M", shares: 8, price: 2100 });
// ul.add_node({ name: "Mahindra", shares: 11, price: 1000 });
// ul.display();
// ul.delete_object("reliance");
// ul.displayObj();
// ul.display();
