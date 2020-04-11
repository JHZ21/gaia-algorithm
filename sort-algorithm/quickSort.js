// 快速排序

const quickSort1 = (arr) => {
  if (arr.length < 2) return arr
  const midIndex = Math.floor(arr.length / 2)
  const midVal = arr[midIndex]
  const left = []
  const right = []
  for (let i = 0; i < arr.length; i++) {
    if (i === midIndex) continue
    if (arr[i] <= midVal) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  return quickSort1(left).concat(midVal, quickSort1(right))
}

const quickSort = (arr, left, right) => {
  if(arr.length < 2)  return arr
  left = typeof left != 'number'? 0: left
  right = typeof right != 'number'? arr.length-1: right
  if(left < right) {
    const partitionIndex = partition(arr, left, right)
    quickSort(arr, left, partitionIndex)
    quickSort(arr, partitionIndex+1, right)
  }
  return arr
}

const partition = (arr, left, right ) => {
  const pivot = left
  let index = left +1
  for(let i=index; i <= right; i++) {
    if(arr[i] < arr[pivot]) {
      swap(arr, index, i)
      index++
    }
  }
  swap(arr, pivot, index-1)
  return index -1
}

function swap(arr, i, j) {
  let t = arr[i]
  arr[i] = arr[j]
  arr[j] = t
}

// test code
const arr = [1, 0, 9, 5, 2, 4, 5, 1]
const arr1 = arr.concat()
let result = []
console.time('time')
result = quickSort1(arr)
console.timeEnd('time')
console.log('result: ', result)
console.time('time')
result = quickSort(arr1)
console.timeEnd('time')
console.log('result: ', result)