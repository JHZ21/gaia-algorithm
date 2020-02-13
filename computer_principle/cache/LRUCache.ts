import { MapType, hasOwnProperty } from "./util";

import {
  Node,
  DoubleLinkedList,
  DoubleLinkedListType
} from "../DoubleLinkedList";

class LRUCache {
  map: MapType<Node>;
  list: DoubleLinkedListType;

  constructor(public capacity: number) {
    if (capacity < 0) {
      throw Error("capacity should be greater than 0");
    }
    this.capacity = capacity;
    this.map = {};
    this.list = new DoubleLinkedList(capacity);
  }

  get(key: number): number {
    if (!hasOwnProperty(this.map, key)) {
      return -1;
    } else {
      const node: Node = this.map[key];
      this.list.remove(node);
      this.list.append_front(node);
      return node.value;
    }
  }

  put(key: number, value: number) {
    if (hasOwnProperty(this.map, key)) {
      const node: Node = this.map[key];
      this.list.remove(node);
      node.value = value;
      this.list.append_front(node);
    } else {
      if (this.list.size >= this.list.capacity) {
        // 删除尾部节点
        const oldNode = this.list.remove();
        delete this.map[oldNode.key];
      }
      const newNode: Node = new Node(key, value);
      this.map[key] = newNode;
      this.list.append_front(newNode);
    }
  }

  print() {
    this.list.print();
  }
}

/* test code: */
// test();
function test() {
  const cache = new LRUCache(2);
  cache.put(2, 2);
  cache.print();
  cache.put(1, 1);
  cache.print();
  cache.put(3, 3);
  cache.print();
  console.log(cache.get(1));
  cache.print();
  console.log(cache.get(2));
  cache.print();
  console.log(cache.get(3));
  cache.print();
}
