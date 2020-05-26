// Graph
function Graph() {
  const vertices = []
  const adjList = new Dictionary()
  const initializeColor = function () {
    const color = {}
    for (let i = 0; i < vertices.length; i++) {
      color[vertices[i]] = 'white'
    }
    return color
  }
  this.addVertex = function (v) {
    vertices.push(v)
    adjList.set(v, [])
  }
  this.addEdge = function (v, w) {
    adjList.get(v).push(w)
    adjList.get(w).push(v)
  }
  this.toString = function () {
    let s = ''
    for (let i = 0; i < vertices.length; i++) {
      s += vertices[i] + ' -> '
      const neighbors = adjList.get(vertices[i])
      for (let i = 0; j < neighbors.length; j++) {
        s += neighbors[i] + ' '
      }
      s += '\n'
    }
    return s
  }
  // 广度优先算法
  this.bfs = function (v, callback) {
    const color = initializeColor()
    queue = new Queue()
    queue.enqueue(v)

    while (!queue.isEmpty()) {
      let u = queue.dequeue()
      const neighbors = adjList.get(u)
      color[u] = 'grey'
      for (var i = 0; i < neighbors.length; i++) {
        let w = neighbors[i]
        if (color[w] === "white") {
          queue.enqueue(w)
        }
      }
      color[u] = 'black'
      if (callback) {
        callback(u)
      }
    }
  }
  // 使用BFS寻找最短路径
  this.BFS = function (v) {
    const color = initializeColor(),
      queue = new Queue(),
      d = {},   // 其他顶点离v的最小距离
      pred = {} // 记录每个顶点最小路径时的前顶点
    queue.enqueue(v)
    // 初始化 d , pred
    for (let i = 0; i < vertices.length; i++) {
      d[vertices[i]] = 0
      pred[vertices[i]] = null
    }

    while (!queue.isEmpty()) {
      let u = queue.dequeue()
      const neighbors = adjList.get(u)
      color[u] = 'grey'
      for (var i = 0; i < neighbors.length; i++) {
        let w = neighbors[i]
        // 广度优先遍历，是由近向远，层层推进的
        if (color[w] === "white") {
          d[w] = d[u] + 1
          pred[w] = u
          queue.enqueue(w)
        }
      }
      color[u] = 'black'
    }
    return {
      distances: d,
      predecessors: pred
    }
  }
  const dfsVisit = function(u, color, callback) {
    color[u] = "gray"
    if(callback) {
      callback(u)
    }
    const neighbors = adjList.get(u)
    for (let i=0; i<neighbors.length; i++) {
      let w = neighbors[i]
      if(color[w] === 'white') {
        dfsVisit(w, color, callback)
      }
    }
    color[u] = "black"
  }
  // 深度优先算法
  this.dfs = function(v) {
    const color = initializeColor()
    for (let i=0; i<vertices.length;i++) {
      if(color[vertices[i]] === "white") {
        dfsVisit(vertices[i], color, callback)
      } 
    }
  }
  const DFSVisit = function(u, color, d, f, p) {
    console.log('discovered ' + u)
    color[u] = 'grey'
    d[u] = ++time
    const neighbors = adjList.get(u)
    for (let i=0; i<neighbors.length; i++) {
      let w = neighbors[i]
      if(color[w] === 'white') {
        p[w] = u
        DFSVisit(u, color, d, f, p)
      }
    }
    color[u] = "black"
    f[u] = ++time
    console.log('explored ' + u)
  }
  this.DFS = function() {
    const color = initializeColor(),
    d = [], // 顶点发现时间
    f = [], // 完成探索时间
    p = []
    let time = 0
    // 初始化 d, f, p
    for(let i=0; i<vertices.length; i++) {
      f[vertices[i]] = 0
      d[vertices[i]] = 0
      p[vertices[i]] = null
    }
    for (i=0; i<vertices.length; i++) {
      if (color[verticesp[i]] === 'white') {
        DFSVisit(u, color, d, f, p)
      }
    }
    return {
      discovery: d,
      finished: f,
      predecessors: p
    }
  }
  const minDistance = function(dist, visited) {
    let min = Infinity, minIndex = -1
    for( let v=0; v<dist.length; v++) {
      if (visited[v] === false && dist[v] <= min) {
        min = dist[v]
        minIndex = v
      }
    }
    return minIndex
  }
  // 寻找最短路径的贪心算法
  this.dijkstra = function(src) {
    const dist = [], visited = [],
    length = this.graph.length
    for (let i=0; i<length; i++) {
      dist[i] = Infinity
      visited[i] = false
    }
    dist[src] = 0
    for(let i=0; i<length-1; i++) {
      let u = minDistance(dist, visited)
      visited[u] = true
      for(let v=0; v<length; v++) {
        if (!visited[v] && this.graph[u][v] !=0 
          && dist[u] != Infinity 
          && dist[u] + this.graph[u][v] < dist[v]) {
            dist[v] = dist[u] + this.graph[u][v]
          }
      }
    }
    return dist
  }
  // 一种最短路径的动态规划算法
  this.flogydWarshall = function() {
    const dist = [],
    length = this.graph.length
    let i, j, k
    for(i = 0; i < length; i++) {
      dist[i] = []
      for(j = 0; j < length; j++) {
        dist[i][j] = this.graph[i][j]
      }
    }
    for (k = 0; k < length; k++) {
      for (i = 0; i < length; i++) {
        for (j = 0; j < length; j++) {
          if(dist[i][k] + dist[k][j] < dist[i][j]) {
            dist[i][j] = dist[i][k] + dist[k][j]
          }
        }
      }
    }
    return dist
  }
  // MST: 最小生成树
  //一种求解加权无向连通图的MST问题的贪心算法
  this.prim = function() {
    const parent = [],
    key = [],
    visited = [],
    length = this.graph.length
    let i
    // 初始化 key, visited
    for (i = 0; i < length; i++) {
      key[i] = Infinity
      visited[i] = false
    }
    key[0] = 0
    parent[0] = -1
    for(i = 0; i < length-1; i++) {
      // 寻找未处理顶点集中key最小的顶点
      let u = minKey(key, visited)
      visited[u] = true
      for(let v = 0; v < length; v++) {
        if(this.graph[u][v] && visited[v] === false 
          && this.graph[u][v] < key[v]) {
            parent[v] = u
            key[v] = this.graph[u][v]
          }
      }
    }
    return parent
  }
  // 一种求加权无向连通图的MSTd的贪心算法 
  this.kruskal = function() {
    const length = this.graph.length,
    parent = []
    let cost,
    ne = 0, a, b, u, v, i, j, min
    cost = initializeColor()
    const find = function(i, parent) {
      while(parent[i]){
        i = parent[i]
      }
      return i
    }
    const union = function(i, j, parent) {
      if(i != j) {
        parent[j] = i
        return true
      }
      return false
    }
    while(ne < length-1) {
      for (i=0; min = Infinity, i <length; i++) {
        for (j=0; j<length; j++) {
          if(cost[i][j] < min) {
            min = cost[i][j]
            u = i
            v = j
          }
        }
      }
    }
    u = find(u, parent)
    v = find(v, parent)
    if(union(u, v, parent)) {
      ne++
    }
    cost[u][v] = cost[v][u] = Infinity
  }
  return parent
}

const graph = new Graph()

// 通过前溯点数组 predecessors, 可以构建顶点，如A到其他顶点的路径
const myVertices = ["A", "B", "C", "D", "F", "G"]
const shortestPathA = graph.BFS(myVertices[0])
const fromVertex = myVertices[0]
for (let i = 1; i < myVertices.length; i++) {
  const toVertice = myVertices[i]
  const path = new Stack()
  for (let v = toVertice; v !== fromVertex;
    v = shortestPathA.predecessors[v]) {
    path.push(v)
  }
  path.push(fromVertex) // 完整的路径 
  let s = path.pop()
  while (!path.isEmpty()) {
    s += ' - ' + path.pop()
  }
  console.log(s)
}
