import { loadNumbers, LoopedLinkedList, output } from "aocutils";

const linkedList = new LoopedLinkedList(loadNumbers().map((i) => i * 811589153));
const zeroNode = linkedList.nodes.find((i) => i.value === 0)!;

for (let i = 0; i < 10; i++) {
	for (const item of linkedList.nodes) {
		let count = item.value % (linkedList.nodeCount - 1);
		if (linkedList.nodeCount - 1 - count < count) count = -(linkedList.nodeCount - 1 - count);
		item.moveForward(count);
	}
}

const sum = zeroNode.offset(1000).value + zeroNode.offset(2000).value + zeroNode.offset(3000).value;

output(sum).forTest(1623178306).forActual(17113168880158);
