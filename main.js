import { Tree } from "./BST.js";

// console.log(new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]));

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

let tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

// prettyPrint(tree.root);

prettyPrint(tree.root);
tree.deleteItem(889);
prettyPrint(tree.root);

console.log(tree.find(4));
console.log("level order:");
tree.levelOrder(console.log);
console.log("in order:");
tree.inOrder(console.log);
prettyPrint(tree.root);
console.log(tree.height(tree.find(7)));
console.log(tree.depth(tree.find(7)));
console.log(tree.isBalanced());

tree.insert(0);
tree.insert(-1);

prettyPrint(tree.root);
console.log(tree.isBalanced());

tree.rebalance();
prettyPrint(tree.root);

