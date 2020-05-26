// Set
function Set() {
  let items = {}
  this.has = function(value) {
    return items.hasOwnProperty(value)
  }
  this.add = function(val) {
    if (!this.has(val)) {
      items[value] = value
      return true
    }
    return false
  }
  this.remove = function(value) {
    if(this.has(value)) {
      delete items[value]
      return true
    }
    return false
  }

  this.clear = function() {
    items = {}
  }
  this.size = function() {
    return Object.keys(items).length
  }
  this.values = function() {
    const values = []
    for(let i=0, keys = Object.keys(items); i< keys.length; i++) {
      values.push(items[keys[i]])
    }
    return values
  }
  // 并集
  this.union = function(otherSet) {
    let unionSet = new Set()

    let values = this.values()
    for(let i=0; i < values.length; i++) {
      unionSet.add(values[i])
    }
    let otherValues = otherSet.values()
    for(let i=0; i<otherValues.length; i++) {
      unionSet.add(otherValues[i])
    }
    return unionSet
  }
  // 交集
  this.insersection = function(otherSet) {
    let interscetionSet = new Set()
    let values = this.values()
    for (let i=0; i <values.length; i++) {
      if(otherSet.has(values[i])) {
        interscetionSet.add(values[i])
      }
    }
    return interscetionSet
  }
  // 差集
  this.difference = function(otherSet) {
    let differenceSet = new Set()
    let values = this.values()
    for (let i=0; i <values.length; i++) {
      if(!otherSet.has(values[i])) {
        differenceSet.add(values[i])
      }
    }
    return differenceSet
  }
  // 子集
  this.subset = function(otherSet) {
    if(this.size() > otherSet.size()) {
      return false
    } else {
      let values = this.values()
      return values.every(value => 
        otherSet.has(value)
      )
    }
  }
}

// 基于es6 Set的拓展
let setA = new Set()
setA.add(1)
setA.add(2)
setA.add(3)
let setB = new Set()
setB.add(2)
setB.add(3)
setB.add(4)
// 并集
let unionAb = new Set()
for(let v of setA) unionAb.add(v)
for(let v of setB) unionAb.add(v)
// 交集
let interscetionSet = function(setA, setB) {
  let interscetionSet = new Set()
  for (let v of setA) {
    setB.has(v) && interscetionSet.add(v)
  }
  return interscetionSet
}
// 差集
let difference = function(setA, setB) {
  let differenceSet = new Set()
  for(let v of setA) {
    !setB.has(v) && differenceSet.add(v)
  }
  return differenceSet
}
// 更简单的差集实现 (仅限Firefox)
// differenceAB = new Set([x for (x of setA) if (!setB.hasd(x))])


