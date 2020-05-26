function ArrayList() {
  const array = []
  this.insert = function (item) {
    array.push(item)
  }
  this.toString = function () {
    return array.join()
  }
  // 冒泡排序
  this.bubbleSort = function () {
    const length = array.length
    function swap(array, index1, index2) {
      let aux = array[index1]
      array[index1] = array[index2]
      array[index2] = aux
    }
    for (let i = 0; i < length - 1; i++) {
      for (let j = 0; j < length - 1 - i; j++) {
        if (array[j] > array[j + 1]) {
          swap(array, j, j + 1)
        }
      }
    }
  }
  // 选择排序
  this.selectionSort = function () {
    let length = array.length,
      indexMin
    for (let i = 0; i < length; i++) {
      indexMin = i
      for (let j = i; j < length; j++) {
        if (array[j] < array[indexMin]) {
          indexMin = j
        }
      }
      if (indexMin !== i) {
        swap(i, indexMin)
      }
    }
  }
  // 插入排序
  this.insertionSort = function () {
    let length = array.length,
      j, temp
    for (let i = 1; i < length; i++) {
      j = i
      temp = array[i]
      while (j > 0 && array[j - 1] > temp) {
        array[j] = array[j--]
        j--
      }
      array[j] = temp
    }
  }
  // 归并排序
  this.mergesort = function () {
    function mergeSortRec(array) {
      let length = array.length
      if (length === 1) {
        return array
      }
      let mid = Math.floor(length / 2)
      let left = array.slice(0, mid)
      let right = array.slice(mid)
      return merge(mergeSortRec(left), mergeSortRec(right))
    }
    function merge(left, right) {
      const result = [],
        il = ir = 0
      while (il < left.length && ir < right.length) {
        if (left[il] < right[ir]) {
          result.push(left[il++])
        } else {
          result.push(right[ir++])
        }
      }
      while (il < left.length) {
        result.push(left[il++])
      }
      while (ir < right.length) {
        result.push(right[ir++])
      }
      return result
    }
    array = mergeSortRec(array)
  }
  // 快速排序
  this.quickSort = function () {
    function quick(array, left, right) {
      let index
      if (array.length > 1) {
        index = partition(array, left, right)
        if (left < index - 1) {
          quick(array, left, index - 1)
        }
        if (index < right) {
          quick(array, index, right)
        }
      }
    }
    function partition(array, left, right) {
      let pivot = array(Math.floor(right+left) /2),
      i = left,
      j = right
      while(i <= j) {
        while(array[i] < pivot) {
          i++
        }
        while(array[j] > pivot) {
          j--
        }
        if(i <= j){
          swap(array, i, j)
          i++
          j--
        }
      }
      return i
    }
    quick(array, 0, array.length - 1)
  }
  // 堆排序
  this.heapSort = function() {
    let heapSize = array.length
    buildHeap(array)
    while(heapSize > 1) {
      heapSize--
      swap(array, 0 ,heapSize)
      heapify(array, heapSize, 0)
    }
    function buildHeap(array) {
      let heapSize = array.length
      for (let i = Math.floor(array.length/2); i>=0; i--) {
        heapify(array, heapSize, i)
      }
    }
    function heapify(array, heapSize, i) {
      let left = i * 2 + 1,
      right = i * 2 + 2,
      largest = i
      if(left < heapSize && array[left] > array[largest]) {
        largest = left
      }
      if(right < heapSize && array[right] > array[largest]) {
        largest = right
      }
      if(largest !== i) {
        swap(array, i, largest)
        heapify(array, heapSize, largest)
      }
    }
  }
  // 顺序搜索
  this.sequentialSearch = function(item) {
    for (let i=0; i<array.length; i++) {
      if (item === array[i]) {
        return i
      }
    }
    return -1
  }
  // 二分搜索
  this.binarySearch - function(item) {
    this.quickSort()
    let low = 0,
    high = array.length -1,
    mid, element
    while(low <= high) {
      mid = Math.floor((low + high) /2)
      element = array[mid]
      if(item < element) {
        high = mid -1
      } else if(element > mid) {
        low = mid+1
      } else {
        return mid
      }
    }
    return -1
  }
  
}

