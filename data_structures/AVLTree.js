// Adelson-Velskii-Landi 树 （简称 AVL树）
// AVL树是一种自平衡树

const heightNode = function(node) {
  if (node === null) {
    return 0
  } else {
    return Math.max(heightNode(node.left), heightNode(node.ri )) + 1
  }
}

// 旋转
const rotationRR = function(node) {
  const temp = node.right
  node.left = temp.left
  temp.left = node
  return temp
}
const rotationLL = function(node) {
  const temp = node.left
  node.left = temp.right
  temp.right = node
  return temp
}
const rotationLR = function(node) {
  node.left = rotationRR(node.left)
  return rotationLL(node)
}
const rotationRL = function(node) {
  node.right = rotatLL(node.right)
  return rotationRR(node)
}

const insertNode = function(node, element) {
  if (node === null) {
    node = new Node(element)
  } else if (element < node.key) {
    node.left = insertNode(node.left, element)
    if (node.left !== null) {
      // 确认是否需要平衡
      if (heightNode(node.left) - heightNode(node.right) > 1) {
        if(element < node.left.key) {
          node = rotationLL(node)
        } else {
          node = rotationLR(node)
        }
      }
    } 
  } else if (element < node.key) {
    node.right = insertNode(node.right ,element)
    if (node.right !== null) {
      // 确认是否需要平衡
      if (heightNode(node.right) - heightNode(node.left) > 1) {
        if (element < node.right.key) {
          node = rotationRL(node)
        }  else {
          node = rotationRR(node)
        }
      }
    }
  }
  return node
}

// 性能更好的红黑树
function RedBlackTree(){}