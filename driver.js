import { Tree } from "./BST.js";

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

let tree = new Tree([
  3, 66, 5, 22, 13, 56, 89, 7, 22, 34, 5, 6, 7, 9, 76, 3, 2,
]);

console.log(tree.isBalanced());
tree.insert(400);
tree.insert(342);
tree.insert(45235400);
prettyPrint(tree.root);
console.log(tree.isBalanced());
tree.rebalance();
prettyPrint(tree.root);
