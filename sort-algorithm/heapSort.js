// Heap Sort 堆排序

function heapSort(arr) {
  for(let i = Math.floor(arr.length/2 -1); i>=0; i--){
    heapify(arr, i, arr.length)
  }
  for(let i = arr.length -1; i>0; i--){
    swap(arr, 0, i)
    heapify(arr, 0, i-1)
  }
  return arr
}

function heapify(arr, i, length){
  for(let j = 2*i +1; j<length; j = 2 * j +1){
    let temp = arr[i] // 父节点值
    if(j+1 < length && arr[j+1]> arr[j]) {
      j++
    }
    if(arr[j]> temp) {
      swap(arr, i, j)
      i = j
    } else {
      break
    }
  }  
}

function swap(arr, i, j){
  const t = arr[i]
  arr[i] = arr[j]
  arr[j] = t
}

// test
const array = [4, 6, 8, 5, 9, 1, 2, 5, 3, 2];
console.log('原始array:', array);
const newArr = heapSort(array);
console.log('newArr:', newArr);
