export class Node<T> {
  public next: Node<T> = null!;
  public prev: Node<T> = null!;

  constructor(public value: T) {
  }

  offset(n: number, skipSelf = false) {
    let node: Node<T> = this;
    for (let i = 0; i < Math.abs(n); i++) {
      node = node[n < 0 ? "prev" : "next"];
      if (node === this && skipSelf) node = node[n < 0 ? "prev" : "next"];
    }
    return node;
  }

  remove() {
    if (this.next !== null && this.prev !== null) {
      this.next.prev = this.prev;
      this.prev.next = this.next;
      this.next = null!;
      this.prev = null!;
    }
    return this;
  }

  insertAfter(node: Node<T>) {
    this.remove();

    this.next = node.next;
    this.prev = node;
    this.prev.next = this;
    this.next.prev = this;

    return this;
  }

  insertBefore(node: Node<T>) {
    return this.insertAfter(node.prev);
  }

  moveForward(n = 1) {
    if (n === 0) return this;
    const node = this.offset(n, true);
    return this[n < 0 ? "insertBefore" : "insertAfter"](node);
  }

  moveBackward(n = 1) {
    return this.moveForward(-n);
  }
}

export class LinkedList<T> {
  public head: Node<T>;
  public tail: Node<T>;

  constructor(public items: T[]) {
    this.head = new Node(items[0]);
    this.tail = this.head;
    for (const item of items.slice(1)) {
      this.tail = new Node(item).insertAfter(this.tail);
    }
  }
}

export class LoopedLinkedList<T> {
  public node: Node<T>;
  public nodes: Node<T>[];

  constructor(public items: T[]) {
    this.node = new Node(items[0]);
    this.nodes = [this.node];
    this.node.next = this.node;
    this.node.prev = this.node;
    let prevNode = this.node;
    for (const item of items.slice(1)) {
      prevNode = new Node(item).insertAfter(prevNode);
      this.nodes.push(prevNode);
    }
  }

  getList() {
    let node = this.node;
    const list: T[] = [];
    while (node !== this.node.prev) {
      list.push(node.value);
      node = node.next;
    }
    list.push(node.value);
    return list;
  }
}
