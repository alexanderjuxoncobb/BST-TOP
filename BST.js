class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(arr) {
    this.arr = arr;
    this.root = this.buildTree(arr);
  }

  buildTree(array) {
    if (array.length === 0) return null;

    let sortedArray = array.sort((a, b) => a - b);
    let uniqueSortedArray = [...new Set(sortedArray)];

    let midPoint = Math.floor(uniqueSortedArray.length / 2);

    const root = new Node(uniqueSortedArray[midPoint]);

    root.left = this.buildTree(uniqueSortedArray.slice(0, midPoint));
    root.right = this.buildTree(uniqueSortedArray.slice(midPoint + 1));

    return root;
  }

  insert(value) {
    if (!this.root) {
      this.root = new Node(value);
      return;
    }

    let currNode = this.root;
    while (true) {
      if (value < currNode.data) {
        if (!currNode.left) {
          currNode.left = new Node(value);
          return;
        }
        currNode = currNode.left;
      } else if (value > currNode.data) {
        if (!currNode.right) {
          currNode.right = new Node(value);
          return;
        }
        currNode = currNode.right;
      } else return;
    }
  }

  deleteItem(value) {
    if (!this.root || !value) return null;

    let currNode = this.root;
    let parNode = null;

    while (currNode && currNode.data !== value) {
      parNode = currNode;
      if (value < currNode.data) {
        currNode = currNode.left;
      } else if (value > currNode.data) {
        currNode = currNode.right;
      }
    }

    if (!currNode) return;

    let leftRight = "left";
    if (!parNode) {
      leftRight = "root";
    } else if (parNode.right.data === currNode.data) {
      leftRight = "right";
    }

    const valueParNode = parNode;

    if (!currNode.left && !currNode.right) {
      // currNode is a leaf
      if (parNode.left && parNode.left.data === value) {
        parNode.left = null;
        return;
      } else if (parNode.right && parNode.right.data === value) {
        parNode.right = null;
        return;
      }
      // one node is null and the other is a value
    } else if (currNode.left && !currNode.right) {
      if (currNode === parNode.right) {
        parNode.right = currNode.left;
      } else {
        parNode.left = currNode.left;
      }
      return;
    } else if (!currNode.left && currNode.right) {
      if (currNode === parNode.right) {
        parNode.right = currNode.right;
      } else {
        parNode.left = currNode.right;
      }
      return;
    } else if (currNode.left && currNode.right) {
      // Way simpler to use recursion. It's actually really beautiful.
      let rightNode = currNode.right;
      let parNode = currNode;
      while (rightNode.left) {
        parNode = rightNode;
        rightNode = rightNode.left;
      }
      parNode.left = null;

      const leftTree = currNode.left;
      const rightTree = currNode.right;

      currNode = rightNode;
      currNode.left = leftTree;
      currNode.right = rightTree;

      if (leftRight === "left") {
        valueParNode.left = currNode;
      } else if (leftRight === "right") {
        valueParNode.right = currNode;
      } else if (leftRight === "root") {
        this.root = currNode;
      }

      return;
    }

    return;
  }

  find(value) {
    let currNode = this.root;
    while (currNode) {
      if (currNode.data === value) return currNode;
      else {
        if (value < currNode.data) {
          currNode = currNode.left;
        } else if (value > currNode.data) {
          currNode = currNode.right;
        }
      }
    }
  }

  levelOrder(callback) {
    if (!(typeof callback === "function"))
      throw new Error("the callback is not a function!");

    let node = this.root;
    let Q = [node];
    while (Q.length) {
      let currNode = Q.pop();
      callback(currNode);
      if (currNode.left) Q.unshift(currNode.left);
      if (currNode.right) Q.unshift(currNode.right);
    }
  }

  inOrder(callback) {
    if (!(typeof callback === "function"))
      throw new Error("the callback is not a function!");

    let orderedArray = [];

    function processNode(node, callback) {
      if (!node) return;

      processNode(node.left, callback);
      callback(node);
      orderedArray.push(node.data);
      processNode(node.right, callback);
    }

    processNode(this.root, callback);
    return orderedArray;
  }

  // postOrder and preOrder could then be easily replciated by switching the processNode / callback order in processNode.

  height(node) {
    if (!node) return -1;

    return 1 + Math.max(this.height(node.left), this.height(node.right));
  }

  depth(node) {
    if (!node) return;

    function findDepth(root, target) {
      if (!root) return;
      if (root === target) return 0;

      const leftDepth = findDepth(root.left, target);
      if (leftDepth >= 0) return leftDepth + 1;

      const rightDepth = findDepth(root.right, target);
      if (rightDepth >= 0) return rightDepth + 1;

      return;
    }

    return findDepth(this.root, node);
  }

  isBalanced() {
    let allBalanced = true;
    const tree = this;
    function branchHeight(node) {
      if (!node || !allBalanced) return;

      const leftHeight = tree.height(node.left);
      const rightHeight = tree.height(node.right);

      if (Math.abs(leftHeight - rightHeight) > 1) {
        allBalanced = false;
      }

      branchHeight(node.left);
      branchHeight(node.right);

      return Math.max(leftHeight, rightHeight) + 1;
    }

    branchHeight(this.root);
    return allBalanced;
  }

  rebalance() {
    const orderedArray = this.inOrder(function () {});
    this.root = this.buildTree(orderedArray);
  }
}

export { Tree };
