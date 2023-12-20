export class Node<T> {
  public next: Node<T> = null!;
  public next50: Node<T> = null!;
  public prev: Node<T> = null!;
  public prev50: Node<T> = null!;

  constructor(public value: T) {}

  offset(n: number) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let node: Node<T> = this;
    const dir = n < 0 ? "prev" : "next";
    for (let i = 0; i < Math.abs(n); i++) {
      if (i > 0 && Math.abs(n) - i > 50) {
        node = node[`${dir}50`];
        i += 49;
      } else {
        node = node[dir];
      }
    }
    return node;
  }

  private update50() {
    let upHundred: Node<T> = this.offset(50);
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let onSpot: Node<T> = this;
    for (let i = 0; i < 100; i++) {
      onSpot.next50 = upHundred;
      upHundred.prev50 = onSpot;
      onSpot = onSpot.prev;
      upHundred = upHundred.prev;
    }
  }

  remove(keepReferences = false) {
    if (this.next !== null && this.prev !== null) {
      this.next.prev = this.prev;
      this.prev.next = this.next;
      this.prev.update50();
      if (!keepReferences) {
        this.next = null!;
        this.prev = null!;
        this.next50 = null!;
        this.prev50 = null!;
      }
    }
    return this;
  }

  insertAfter(node: Node<T>) {
    this.remove();

    this.next = node.next;
    this.prev = node;
    this.prev.next = this;
    this.next.prev = this;
    this.update50();

    return this;
  }

  insertBefore(node: Node<T>) {
    return this.insertAfter(node.prev);
  }

  moveForward(n = 1) {
    if (n === 0) return this;
    this.remove(true);
    const node = this.offset(n);
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
  public nodeCount: number;

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
    this.nodeCount = this.nodes.length;
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
