// queue 队列

function Queue() {
  let items = []
  this.enqueue = function(element) {
    items.push(element)
  }
  this.dequeue = function() {
    return this.shift()
  }
  this.front = function() {
    return items[0]
  }
  this.isEmpty = function() {
    return this.items
  }
  this.size = function() {
    return items.length
  }
  this.print = function() {
    console.log(items.toString())
  }
}

// es6
const Queue2 = (function() {
  const items = new WeakMap()
  class Queue2 {
    constructor() {
      items.set(this, [])
    }
    enqueue(element) {
      let q = items.get(this)
      q.push(element)
    }
    dequeue(){
      let q = items.get(this)
      let r = q.shift()
      return r
    }
  }
  return Queue2
})()

// 优先队列
function PriorityQueue() {
  let items = []
  function QueueElement (element, priority) {
    this.element = element
    this.priority = priority
  }
  this.enqueue = function(element, priority) {
    let queueElement = new QueueElement(element, priority)

    let added = false
    for(let i=0; i<items.length; i++) {
      if(queueElement.priority < items[i].priority) {
        items.splice(i, 0, queueElement)
        added = true
        break
      }
    }
    if(!added) {
      items.push(queueElement)
    }
  }
  this.print = function() {
    for (let i=0; i<items.length; i++) {
      console.log(`${items[i].element} - ${items[i].priority}`)
    }
  }
  // 其他方法和默认的Queue实现相同
}

// 循环队列的例子：击鼓传花
function hotPotato (nameList, num) {
  let queue = new Queue()
  for (let i=0; i<nameList.length; i++) {
    queue.enqueue(nameList[i])
  }
  let eliminated = ''
  while (queue.size() > 1) {
    for(let i=0; i<num; i++) {
      queue.enqueue(queue.dequeue())
    }
    eliminated = queue.dequeue()
    console.log(`${eliminated}: 在击鼓传花游戏中被淘汰`)
  }
  return queue.dequeue()
}
