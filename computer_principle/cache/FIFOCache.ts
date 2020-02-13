import { MapType, hasOwnProperty } from "./util";

import {
  Node,
  DoubleLinkedList,
  DoubleLinkedListType
} from "../DoubleLinkedList";

class FIFOCache {
  size: number;
  map: MapType<Node>;
  list: DoubleLinkedListType;
  constructor(public capacity) {
    this.capacity = capacity;
    this.size = 0;
    this.map = {};
    this.list = new DoubleLinkedList(capacity);
  }

  get(key: number): number {
    if (!hasOwnProperty(this.map, key)) {
      return -1;
    } else {
      return this.map[key].value;
    }
  }

  put(key: number, value: number) {
    if (this.capacity === 0) return;
    if (hasOwnProperty(this.map, key)) {
      const node: Node = this.map[key];
      this.list.remove(node);
      this.list.append(node);
    } else {
      if (this.size === this.capacity) {
        const node: Node = this.list.pop();
        delete this.map[node.key];
        this.size--;
      }
      const node: Node = new Node(key, value);
      this.list.append(node);
      this.map[key] = node;
      this.size++;
    }
  }

  print() {
    this.list.print();
  }
}

/* test code: */
// test();
function test() {
  const cache = new FIFOCache(2);
  cache.put(1, 1);
  cache.print();
  cache.put(2, 2);
  cache.print();
  console.log(cache.get(1));
  cache.put(3, 3);
  cache.print();
  console.log(cache.get(2));
  cache.print();
  cache.put(4, 4);
  cache.print();
  console.log(cache.get(1));
}

