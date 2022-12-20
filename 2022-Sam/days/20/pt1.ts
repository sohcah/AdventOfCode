import {IS_TEST, loadNumbers, LoopedLinkedList, output} from "aocutils";

// Explaining the initial bug which caused me to take so long to solve this:
// I was using a linked list to store the numbers, and I was using a map to store the references to the nodes.
// To loop through the list, I was looping through the original numbers array, and using the map to get the node.
// This worked fine for the test input, but the real input had duplicate numbers, so the lookup gave me the wrong node.
// I fixed this by instead storing an array of items in the original order, and using that to loop through the list.
// I initially kept the map just to get the 0 node, but I realised I could just store the 0 node in a variable instead.

// I've since rewritten my solution to use my new LoopedLinkedList class.

const linkedList = new LoopedLinkedList(loadNumbers());
const zeroValue = linkedList.nodes.find(i => i.value === 0)!;

if (IS_TEST) console.log(linkedList.getList());

for (const item of linkedList.nodes) {
  item.moveForward(item.value);

  if (IS_TEST) console.log(linkedList.getList());
}

const sum =
  zeroValue.offset(1000).value
  + zeroValue.offset(2000).value
  + zeroValue.offset(3000).value;

output(sum).forTest(3).forActual(13522);
