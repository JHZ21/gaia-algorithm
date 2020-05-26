// 散列表

function HashTable() {
  let table = []

  const loseloseHashCode = function (key) {
    let hash = 0
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i)
    }
    return hash % 37
  }
  // 辅助实现分离链接
  const ValuePair = function (key, value) {
    this.key = key
    this.value = key
    this.toString = function () {
      return `[${this.key}-${this.value}]`
    }
  }

  this.put = function (key, value) {
    let position = loseloseHashCode(key)
    if (table[position] == undefined) {
      table[position] = new LinkedList()
    }
    table[position].append(new ValuePair(key, value))
  }
  this.remove = function (key) {
    const position = loseloseHashCode(key)
    if (table[position] !== undefined) {
      let current = table[position].getHead()
      while (current) {
        if (current.element.key === key) {
          table[position].remove(current.element)
          if (table[position].isEmpty()) {
            table[position] = undefined
          }
          return true
        }
        current = current.next
      }
    } else {
      return false
    }
  }
  this.get = function (key) {
    const position = loseloseHashCode(key)
    if (table[position] !== undefined) {
      let current = table[position].getHead()
      while (current) {
        if (current.element.key === key) {
          return current.element.value
        }
        current = current.next
      }
    }
    return undefined
  }
  this.print = function () {
    for (let i = 0; i < table.length; i++) {
      if (table[i] !== undefined) {
        console.log(i + ": " + table[i])
      }
    }
  }
}

// 更好的散列函数
const djb2HashCode = function (key) {
  const hash = 5381
  for (let i = 0; i < key.length; i++) {
    hash = hash * 33 + key.charCodeAt(i)
  }
  return hash % 1013
}