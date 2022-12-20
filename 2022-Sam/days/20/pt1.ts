import { IS_TEST, loadNumbers, output } from "aocutils";

// Explaining the initial bug which caused me to take so long to solve this:
// I was using a linked list to store the numbers, and I was using a map to store the references to the nodes.
// To loop through the list, I was looping through the original numbers array, and using the map to get the node.
// This worked fine for the test input, but the real input had duplicate numbers, so the lookup gave me the wrong node.
// I fixed this by instead storing an array of items in the original order, and using that to loop through the list.
// I initially kept the map just to get the 0 node, but I realised I could just store the 0 node in a variable instead.

const numbers = loadNumbers();

class LinkedItem {
  constructor(public value: number, public next: LinkedItem | null, public prev: LinkedItem | null) {

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


let zeroValue;
const refList = [];


const firstItem = new LinkedItem(numbers[0], null!, null!);
if (numbers[0] === 0) {
  zeroValue = firstItem;
}
refList.push(firstItem);
firstItem.next = firstItem;
firstItem.prev = firstItem;
let lastItem = firstItem;
for (const number of numbers.slice(1)) {
  lastItem = new LinkedItem(number, firstItem, lastItem).insertAfter(lastItem);
  refList.push(lastItem);
  if (number === 0) {
    zeroValue = lastItem;
  }
}

for (const item of refList) {
  const number = item.value;
  for (let i = 0; i < Math.abs(number); i++) {
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


let sum = 0;
let node = zeroValue;
for (let i = 1; i <= 3000; i++) {
  node = node.next;
  if (i % 1000 === 0) {
    sum += node.value;
    console.log(node.value);
  }
}


output(sum).forTest(3).forActual(13522);
