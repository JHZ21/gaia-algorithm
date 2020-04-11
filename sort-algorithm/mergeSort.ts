// 归并排序 Merge Sort

function mergeSort(arr: number[]): number[] {
  if (arr.length < 2) {
    return arr
  }
  const middle = Math.floor(arr.length / 2)
  console.log(arr.length, middle)
  const left: number[] = arr.slice(0, middle)
  const right: number[] = arr.slice(middle)
  return merge(mergeSort(left), mergeSort(right))
}

function merge(left: number[], right: number[]): number[] {
  const result: number[] = []
  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      result.push(left.shift())
    } else {
      result.push(right.shift())
    }
  }
  left.length && Array.prototype.push.apply(result, left)
  right.length && Array.prototype.push.apply(result, right)
  return result
}

// test code
const testArr: number[] = [10, 10, 108, 1, 3, 0, 1]
console.time('time')
const result: number[] = mergeSort(testArr)
console.timeEnd('time')
console.log('result: ', result)

