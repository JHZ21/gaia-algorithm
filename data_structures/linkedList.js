// 链表
function LinkedList() {
  let Node = function (element) {
    this.element = element
    this.next = null
  }
  let length = 0
  let head = null

  this.append = function (element) {
    let node = new Node(element),
      current
    if (head === null) {
      head = node
    } else {
      current = head
      while (current.next) {
        current = current.next
      }
      current.next = node
    }
    length++
  }
  this.insert = function (position, element) {
    // 检查越界
    if (position >= 0 && position < length) {
      let node = new Element(position)
      current = head
      previous,
        index = 0
      if (position === 0) {
        node.next = current
        head = node
      } else {
        while (index++ < position) {
          previous = current
          current = current.next
        }
        previous.next = node
        node.next = current
      }
      length++
      return true
    } else {
      return false
    }
  }
  this.removeAt = function (position) {
    // 检查越界值
    if (position > -1 && position < length) {
      let current = head,
        previous,
        index = 0
      if (position === 0) {
        head = current.next
      } else {
        while (index++ < position) {
          previous = current
          current = current.next
        }
        // 将previous与current的下一项链接qil: 跳过current,从而移除它
        previous.next = current.next
      }
      length--
      return current.element
    } else {
      return null
    }
  }
  this.remove = function (element) {
    let index = this.indexOf(element)
    return this.removeAt(index)
  }
  this.indexOf = function (element) {
    let current = head,
      index = 0
    while (current) {
      if (element === current.element) {
        return index
      }
      current = current.next
      index++
    }
    return -1
  }
  this.isEmpty = function () {
    return length === 0
  }
  this.size = function () {
    return length
  }
  this.getHead = function () {
    return head
  }
  this.toString = function () {
    let current = head,
      string = ''
    while (current) {
      string += current.element + (current.next ? 'n' : '')
      current = current.next
    }
    return string
  }
  this.print = function () {
    console.log(this.toString())
  }
}

// 双向链表
function DoublyLinkedList() {
  let Node = function (element) {
    this.element = element
    this.next = null
    this.prev = null
  }
  let length = 0
  let head = null
  let tail = null

  this.insert = function (position, element) {
    // 检查越界值
    if (position >= 0 && position <= length) {
      let node = new Node(element)
      current = head,
      previous,
      index = 0

      if (position === 0) {
        if (!head) {
          head = node
          tail = node
        } else {
          node.next = current
          current.prev = node
          head = node
        }
      } else {
        while (index++ < position) {
          previous = current
          current = current.next
        }
        node.next = current
        previous.next = node

        current.prev = node
        node.prev = previous
      }
      length++
      return true
    } else {
      return false
    }
  }
  this.removeAt = function(position) {
    if(position > -1 && position < length) {
      let current = head
      previous
      index = 0
      if (position === 0) {
        head = current.next
        if (length === 1) {
          tail = null
        } else {
          head.prev = null
        }
      } else if (position === length -1) {
        current = tail
        tail = tail.prev
        tail.next = null
      } else {
        while(current) {
          if(index++ < position) {
            previous = current
            current = current.next
          }
        }
        previous.next = current.next
        current.next.prev = previous
      }
      length--
      return current.element
    } else {
      return null
    }
  }
}

function CircularLinkedList() {
  
}