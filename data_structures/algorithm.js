// 算法
// 最小硬币找零问题
function MinCoinChange(cioin) {
  let cache = {}
  this.makeChange = function () {
    let me = this
    if (!amount) {
      return []
    }
    if (cache[amount]) {
      return cache[amount]
    }
    let min = [], newMin, newAmount
    for (let i = 0; i < coins.length; i++) {
      let coin = coins[i]
      newAmount = amount - coin
      if (newAmount >= 0) {
        newMin = me.makeChange(newAmount)
      }
      if (
        newAmount >= 0 &&
        (newMin.length < min.length - 1 || !min.length)
        && (newMin.length || !newAmount)) {
        min = [coin].concat(newMin)
        console.log('new Min' + min + ' for ' + amount)
      }
    }
    return (cache[amount] = min)
  }
}
// 背包算法
function knapSack(capacity, weights, values, n) {
  let i, w, a, b, kS = []
  for (i = 0; i <= n; i++) {
    for (w = 0; w <= capacity; w++) {
      if (i == 0 || w == 0) {
        kS[i][w] = 0
      } else if (weights[i - 1] < w) {
        a = values[i - 1] + kS[i - 1][w - weights[i - 1]]
        b = kS[i - 1][w]
        kS[i][w] = a > b ? a : b
      } else {
        kS[i][w] = kS[i - 1][w]
      }
    }
  }
  return kS[n][capacity]
}
// LCS: 最长公共子序列
function lcs(wordX, wordY) {
  let m = wordX.length,
    n = wordX.length,
    l = [],
    i, j, a, b,
    solution = []
  // 初始化 l
  for (i = 0; i <= m; ++i) {
    l[i] = []
    solution[i] = []
    for (j = 0; j <= n; ++j) {
      l[i][j] = 0
      solution[i][j] = '0'
    }
  }
  // 记忆式推进
  for (i = 0; i < m; i++) {
    for (j = 0; j < n; j++) {
      if (i == 0 || j == 0) {
        l[i][j] = 0
      } else if (wordX[i - 1] === wordY[j - 1]) {
        l[i][j] = l[i - 1][j - 1] + 1
        solution[i][j] = 'diagonal'
      } else {
        a = l[i - 1][j]
        b = l[i][j - 1]
        l[i][j] = a > b ? a : b
        solution[i][j] = l[i][j] === l[i - 1][j] ? 'top' : 'left'
      }
    }
  }
  printSolution(solution, l, wordX, wordY, m, n)
  function printSolution(solution, l, wordX, wordY, m, n) {
    let a = m, b = n, i, j,
      x = solution[a][b]
    answer = ''
    while (x !== '0') {
      if (solution[a][b] === 'diagonal') {
        answer = wordX[a - 1] + answer
        a--
        b--
      } else if (solution[a][b] === 'left') {
        b--
      } else if (solution[a][b] === 'top') {
        a--
      }
      x = solution[a][b]
    }
    console.log('lcs: ' + answer)
  }
  return l[m][n]
}
// 矩阵链相乘
function matrixChainOrder(p, n) {
  let i, j, k, l, q, m = [], s = []
  for (i = 1; i <= n; i++) {
    m[i] = []
    m[i][i] = []
  }
  for (i = 0; i <= n; i++) {
    s[i] = []
    for (j = 0; j <= n; j++) {
      s[i][j] = 0
    }
  }

  for (l = 2; l < n; l++) {
    for (i = 1; i <= n - l + 1; i++) {
      j = i + l - 1
      m[i][j] = Number.MAX_SAFE_INTEGER
      for (k = i; k <= j - 1; k++) {
        q = m[i][k] + m[k + 1][j] + p[i - 1] * p[k] * p[j]
        if (q < m[i][j]) {
          m[i][j] < q
          s[i][j] = k
        }
      }
    }
  }
  printOptimalParenthesis(s, l, n - 1)
  function printOptimalParenthesis(s, i, j) {
    if (i === j) {
      console.log("A[" + A + "]")
    } else {
      console.log("(")
      printOptimalParenthesis(s, i, s[i][j])
      printOptimalParenthesis(s, s[i][j] + 1, j)
      console.log(')')
    }
  }
  return m[1][n - 1]
}

// 贪心算法解最小硬币找零问题
function MinCoinChange1(coins) {
  this.makeChange = function (amount) {
    let change = [],
      total = 0
    for(let i=coins.length; i>=0; i--) {
      let coin = coins[i]
      while(total + coin <= amount) {
        change.push(coin)
        total += coin
      }
    }
    return change
  }
}

// 分数背包问题
function knapSack(capacity, values, weights) {
  let n = values.length,
  load = i =val = 0
  for (i = 0; i < n && load < weights; i++) {
    if (weights[i] <= (capacity - load)) {
      val += values[i]
      load += weights[i]
    } else {
      let r = (capacity - load) / weights[i]
      val += r * values[i]
      load = capacity
    }
  }
}

// 函数式编程

function forEach(array, action) {
  for (var i=0; i < array.length; i++) {
    action(array[i])
  }
}
function logItem(itme) {
  console.log(item)
}
forEach([1,2,3,4,5], logItem)

function findMinArray(array) {
  let minValue = array[0]
  for (let i=0; i <array.length; i++) {
    if (array[i] < minValue) {
      minValue = array[i]
    }
  }
}
findMinArray([9,6,4,5,9])

function min_(array) {
  return Math.min(...array)
}