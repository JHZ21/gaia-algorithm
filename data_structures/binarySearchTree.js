// 二叉搜索树
function BinarySearchTree() {
  const Node = function(key) {
    this.key = key
    this.left = null
    this.right = null
  }
  let root = null

  const insertNode = function(node, newNode) {
    if(newNode.key < node.key) {
      if(node.left === null) {
        node.left = newNode
      } else {
        insertNode(node.left, newNode)
      }
    } else {
      if(node.right === null) {
        node.right = newNode
      } else {
        insertNode(node.right, newNode)
      }
    }
  }
  const inOrderTraverseNode = function(node, callback) {
    if (node !== null) {
      inOrderTraverseNode(node.left, callback)
      callback(node.key)
      inOrderTraverseNode(node.right, callback)
    }
  }
  const preOrderTraverseNode = function(node, callback) {
    if(node !== null) {
      callback(node.key)
      preOrderTraverseNode(node.left, callback)
      preOrderTraverseNode(node.right, callback)
    }
  }
  const postOrderTraverseNode = function(node, callback) {
    if(node !== null) {
      postOrderTraverseNode(node.left, callback)
      postOrderTraverseNode(node.right, callback)
      callback(node.key)
    }
  }
  const minNode = function(node) {
    if(node) {
      while(node && node.left !== null) {
        node = node.left
      }
      return node.key
    } 
    return null
  }
  const maxNode = function(node) {
    if(node) {
      while(node && node.right !== null) {
        node = node.right
      }
      return node.key
    } 
    return null
  }
  const searchNode = function(node, key) {
    if(node === null) {
      return false
    }
    if (key < node.key) {
      searchNode(node.left, key)
    } else if (key > node.key) {
      searchNode(node.right, key)
    } else {
      return true
    }
  }
  const findMinNode = function(node) {
    while (node && node.left !== null) {
      node = node.left
    }
    return node
  }
  // 返回修剪后的node
  const removeNode = function(node, key) {
    if (node === null) {
      return null
    } 
    if (key < node.key) {
      node.left = removeNode(node.left ,key)
      return node
    } else if (key > node.key) {
      node.right = removeNode(node.right, key)
      return node
    } else {
      // 键等于node.key

      // 直接给node赋值，是有问题的，无法覆盖
      // 第一种情况：一个叶节点
      if (node.left === null && node.right === null) {
        node = null
        return node
      }
      // 第二种情况：一个只有一个子节点的节点
      if (node.left === null) {
        node = ndoe.right
        return node
      } else if (node.right === null) {
        node = node.left
        return node
      }
      // 第三种情况：一个有两个字节点的节点
      const aux = findMinNode(node.right)
      node.key = aux.key
      node.right = removeNode(node.right, aux.key)
      return node
    }
  }

  this.insert = function(key) {
    let newNode = new Node(key)
    if (root === null) {
      root = newNode
    } else {
      insertNode(root,  newNode)
    }
  }
  this.search = function() {
    return searchNode(root, key)
  }
  this.inOrderTraverse = function(callback) {
    inOrderTraverseNode(root, callback)
  }
  this.preOrderTraverse = function(callback) {
    preOrderTraverseNode(root, callback)
  }
  this.postOrderTraverse = function(callback) {
    postOrderTraverseNode(root, callback)
  }
  this.min = function() {
    return minNode(root)
  }
  this.max = function() {
    return maxNode(root)
  }
  this.remove = function(key) {
    root = removeNode(root, key)
  }
}