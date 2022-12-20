import {IS_TEST, loadLines, loadNumbers, output, stabilise} from "aocutils";
import {N} from "./n";


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


const firstItem = new LinkedItem(numbers[0], null!, null!);
reference.set(numbers[0], firstItem);
refList.push(firstItem);
firstItem.next = firstItem;
firstItem.prev = firstItem;
let lastItem = firstItem;
for (const number of numbers.slice(1)) {
  lastItem = new LinkedItem(number, firstItem, lastItem).insertAfter(lastItem);
  refList.push(lastItem);
  // if(reference.has(number)) {
  //   throw new Error(`Duplicate ${number}`);
  // }
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

for (const item of refList.slice(0,N)) {
  // const item = reference.get(number)!;
  const number = item.value;

  console.log("move", item.prev.value, '<-', number, '->', item.next.value);
  for (let i = 0; i < Math.abs(number); i++) {
    Math.sign(number) === 1 ? item.moveForward() : item.moveBackward();
  }

  console.log("move", item.prev.value, '<-', number, '->', item.next.value);


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

  // {
  //   let node = firstItem;
  //   let list = [];
  //   while (node !== firstItem.prev) {
  //     list.push(node.value);
  //     node = node.next;
  //   }
  //   list.push(node.value);
  //   console.log(list);
  //
  // }
  // console.log('Move', item.value, 'after', node.value);
  // // if(item !== node) {
  //   item.insertAfter(node);
  // // }
}


{
  let node = firstItem;
  let list = [];
  while (node !== firstItem.prev) {
    list.push(node.value);
    node = node.next;
  }
  list.push(node.value);
  console.log(list.indexOf(0));
  console.log(list.indexOf(9779));
  console.log(list.indexOf(863));
  console.log(list.lastIndexOf(6388));


  console.log("IDX", list.indexOf(-3883), list.indexOf(-1293), list.indexOf(1605), list.indexOf(0));

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


output(sum).forTest(3);
