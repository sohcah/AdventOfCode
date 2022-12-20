import {IS_TEST, loadNumbers, output} from "aocutils";

const numbers = loadNumbers();

class LinkedItem {
  constructor(public value: number, public next: LinkedItem | null, public prev: LinkedItem | null) {

  }

  remove() {
    this.prev.next = this.next;
    this.next.prev = this.prev;
    this.next = null;
    this.prev = null;
  }

  insertAfter(item: LinkedItem) {
    this.next.prev = this.prev;
    this.prev.next = this.next;

    this.next = item.next;
    this.prev = item;
    this.prev.next = this;
    this.next.prev = this;
    return this;
  }

  insertBefore(item: LinkedItem) {
    return this.insertAfter(item.prev);
  }

  moveForward() {
    return this.insertAfter(this.next);
  }

  moveBackward() {
    return this.insertBefore(this.prev);
  }
}


const reference = new Map<number, LinkedItem>();
const refList = [];


const firstItem = new LinkedItem(numbers[0] * 811589153, null!, null!);
reference.set(numbers[0], firstItem);
refList.push(firstItem);
firstItem.next = firstItem;
firstItem.prev = firstItem;
let lastItem = firstItem;
for (const number of numbers.slice(1)) {
  lastItem = new LinkedItem(number * 811589153, firstItem, lastItem).insertAfter(lastItem);
  refList.push(lastItem);
  reference.set(number, lastItem);
}


if (IS_TEST) {
  let node = firstItem;
  let list = [];
  while (node !== firstItem.prev) {
    list.push(node.value);
    node = node.next;
  }
  list.push(node.value);
  console.log(list);
}

for(let i = 0;i < 10;i++) {
  for (const item of refList) {
    const number = item.value;
    for (let i = 0; i < Math.abs(number) % (refList.length - 1); i++) {
      Math.sign(number) === 1 ? item.moveForward() : item.moveBackward();
    }

    if (IS_TEST) {
      let node = firstItem;
      let list = [];
      while (node !== firstItem.prev) {
        list.push(node.value);
        node = node.next;
      }
      list.push(node.value);
      console.log(list);
    }
  }
}


let sum = 0;
let node = reference.get(0)!;
for (let i = 1; i <= 3000; i++) {
  node = node.next;
  if (i % 1000 === 0) {
    sum += node.value;
    console.log(node.value);
  }
}


output(sum).forTest(1623178306);
