import { IS_TEST, loadNumbers, LoopedLinkedList, output } from "aocutils";

const linkedList = new LoopedLinkedList(loadNumbers().map((i) => i * 811589153));
const zeroNode = linkedList.nodes.find((i) => i.value === 0)!;

if (IS_TEST) console.log(linkedList.getList());

for (let i = 0; i < 10; i++) {
	for (const item of linkedList.nodes) {
		item.moveForward(item.value % (linkedList.nodes.length - 1));
		if (IS_TEST) console.log(linkedList.getList());
	}
}

const sum = zeroNode.offset(1000).value + zeroNode.offset(2000).value + zeroNode.offset(3000).value;

output(sum).forTest(1623178306).forActual(17113168880158);
