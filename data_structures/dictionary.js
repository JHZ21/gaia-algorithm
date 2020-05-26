// 字典
function Dictionary() {
  let items = {}
  this.has = function(key) {
    return items.hasOwnProperty(key)
  }
  this.set = function(key, value) {
    items[key] = value
  }
  this.delete = function(key) {
    if (this.has(key)) {
      delete items[key]
      return true
    } 
    return false
  }
  this.get = function(key) {
    return this.has(key)? items[key] : undefined
  }
  this.clear = function(){

  }
  this.keys = function(){
    return Object.keys(items)
  }
  this.getItems = function() {
    return items
  }
  this.values = function(){
    let values = []
    for (let k in items) {
      if (this.has(key)) {
        values.push(items[k])
      }
    }
    return values
  }
}