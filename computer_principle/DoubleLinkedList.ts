export class Node {
  key: number;
  value: number;
  prev: Node = null;
  next: Node = null;

  constructor(key: number, val: number) {
    this.key = key;
    this.value = val;
  }

  toString(): string {
    let str: string = `{${this.value}: ${this.value}}`;
    return str;
  }
}

export interface DoubleLinkedListType {
  capacity: number;
  head: Node;
  tail: Node;
  size: number;
  pop(): Node;
  append(node: Node): Node;
  append_front(node: Node): Node;
  remove(node?: Node): Node;
  print(): void;
}

export class DoubleLinkedList {
  capacity: number;
  head: Node = null;
  tail: Node = null;
  size: number = 0;

  constructor(capacity?: number) {
    this.capacity = capacity ? capacity : 0xffff;
  }
  // 向头部添加节点
  private add_head(node: Node): Node {
    if (!this.head) {
      // 空链表
      this.head = this.tail = node;
      node.prev = node.next = null;
    } else {
      // 有节点的链表
      node.next = this.head;
      this.head.prev = node;
      this.head = node;
      node.prev = null;
    }
    this.size += 1;
    return node;
  }
  // 向尾部添加节点
  private add_tail(node: Node): Node {
    if (!this.tail) {
      // 空链表
      this.head = this.tail = node;
      node.prev = node.next = null;
    } else {
      node.prev = this.tail;
      this.tail.next = node;
      this.tail = node;
      node.next = null;
    }
    this.size += 1;
    return node;
  }
  // 从头部删除节点
  private del_head(): Node {
    // 空链
    if (!this.head) return;
    const node: Node = this.head;
    if (!node.next) {
      // 只有一个节点
      this.tail = this.head = null;
    } else {
      this.head = this.head.next;
      this.head.prev = null;
    }
    this.size -= 1;
    return node;
  }
  // 从尾部删除节点
  private del_tail(): Node {
    // 空链表
    if (!this.tail) return;
    const node: Node = this.tail;
    if (!node.prev) {
      // 只有一个节点
      this.tail = this.head = null;
    } else {
      this.tail = this.tail.prev;
      this.tail.next = null;
    }
    this.size -= 1;
    return node;
  }
  // 任意节点删除, 参数为空时，删除尾节点
  private __remove(node?: Node): Node {
    // 空链表
    if (!this.head) return node;
    node || (node = this.tail);
    if (node === this.head) {
      this.del_head();
    } else if (node === this.tail) {
      this.del_tail();
    } else {
      node.prev.next = node.next;
      node.next.prev = node.prev;
    }
    return node;
  }

  pop(): Node {
    return this.del_head();
  };
  append(node: Node): Node {
    return this.add_tail(node);
  };
  append_front(node: Node): Node {
    return this.add_head(node);
  };
  remove(node?: Node): Node {
    return this.__remove(node);
  };
  print() {
    let p: Node = this.head;
    let str = "";
    while (p) {
      str += p.toString();
      p = p.next;
      if (p) {
        str += " <==> ";
      }
    }
    console.log(str);
  }
}

/* test code: */
// test();
function test() {
  const l = new DoubleLinkedList(10);
  const nodes: Node[] = [];
  // const aNode : Array<number> = []
  for (let i = 0; i < 10; i++) {
    const node: Node = new Node(i, i);
    nodes.push(node);
  }

  l.append(nodes[0]);
  l.print();
  l.append(nodes[1]);
  l.print();
  l.pop();
  l.print();
  l.append(nodes[2]);
  l.print();
  l.append_front(nodes[3]);
  l.print();
  l.append(nodes[4]);
  l.print();
  l.remove(nodes[2]);
  l.print();
  l.remove();
  l.print();
}