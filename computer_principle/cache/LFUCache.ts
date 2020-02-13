import { MapType, hasOwnProperty } from "./util";

import {
  Node,
  DoubleLinkedList,
  DoubleLinkedListType
} from "../DoubleLinkedList";

interface LFUNodeType extends Node {
  freq: number;
}

class LFUNode extends Node {
  freq: number;
  constructor(public key: number, public value: number) {
    super(key, value);
    this.freq = 0;
  }
}

interface Frep_mapType {
  [freq: number]: DoubleLinkedListType;
}

class LFUCache {
  map: MapType<LFUNodeType> = {};
  // key: 频率, value: 频率对应的双向链表
  freq_map: Frep_mapType = {};
  size: number = 0;
  constructor(public capacity: number) {
    this.capacity = capacity;
  }
  __update_freq(node: LFUNodeType) {
    let freq: number = node.freq;
    // 删除
    this.freq_map[freq].remove(node);
    if (this.freq_map[freq].size === 0) {
      delete this.freq_map[freq];
    }
    // 更新
    node.freq = ++freq;
    if (!hasOwnProperty(this.freq_map, freq)) {
      this.freq_map[freq] = new DoubleLinkedList();
    }
    this.freq_map[freq].append(node);
  }

  get(key: number): number {
    if (!hasOwnProperty(this.map, key)) {
      return -1;
    } else {
      const node: LFUNodeType = this.map[key];
      this.__update_freq(node);
      return node.value;
    }
  }
  private __min(obj: { [key: number]: any }): number {
    return Array.prototype.sort.call(
      Object.keys(obj),
      (a: string, b: string) => +a - +b
    )[0];
  }

  put(key: number, value: number) {
    if (this.capacity === 0) return;
    // 缓存命中
    if (hasOwnProperty(this.map, key)) {
      const node: LFUNodeType = this.map[key];
      node.value = value;
      this.__update_freq(node);
    } else {
      // 缓存未命中
      // 容量已满
      if (this.size >= this.capacity) {
        const min_freq = this.__min(this.freq_map);
        const clearedNode: LFUNodeType = <LFUNodeType>(
          this.freq_map[min_freq].pop()
        );
        delete this.map[clearedNode.key];
        this.size--;
      }
      // 容量未满
      const newNode: LFUNodeType = new LFUNode(key, value);
      let freq: number = ++newNode.freq;
      this.map[key] = newNode;
      this.freq_map[freq] || (this.freq_map[freq] = new DoubleLinkedList());
      this.freq_map[freq].append(newNode);
      this.size++;
    }
  }

  print() {
    console.log("/****************");
    for (let [k, v] of (<any>Object).entries(this.freq_map)) {
      console.log(`Freq = ${k}`);
      v.print();
    }
    console.log("\\**************");
    console.log();
  }
}

/* test: code  */
// test();
function test() {
  const cache = new LFUCache(2);
  cache.put(1, 1);
  cache.print();
  cache.put(2, 2);
  cache.print();
  console.log(cache.get(1));
  cache.print();
  cache.put(3, 3);
  cache.print();
  console.log(cache.get(2));
  cache.print();
  console.log(cache.get(3));
  cache.print();
  cache.put(4, 4);
  cache.print();
  console.log(cache.get(1));
  cache.print();
  console.log(cache.get(3));
  cache.print();
  console.log(cache.get(4));
  cache.print();
}
