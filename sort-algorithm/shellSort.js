// 希尔排序

const shellSort = arr => {
  let len = arr.length,
            temp,
            gap = 1
  while(gap < len /3) {
    gap = gap * 3 + 1
  }
  for(gap;gap > 0; gap = Math.floor(gap/3)) {
    for(let i =gap; i<arr.length ;i++ ) {
      temp = arr[i]
      let j = i -gap
      for(j; j >=0 && arr[j]> temp; j-=gap) {
        arr[j+gap] = arr[j]
      }
      arr[j+gap] =temp
    }
  }
  return arr
}

// test 
const array = [35, 33, 42, 10, 14, 19, 27, 44]
console.time('time')
const newArr = shellSort(array)
console.timeEnd('time')
console.log('newArr:', newArr)