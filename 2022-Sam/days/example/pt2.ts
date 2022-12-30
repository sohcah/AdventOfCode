import { loadNumbers, output, sum } from "aocutils";

const input = loadNumbers();

let count = 0;
for (let i = 1; i < input.length - 2; i++) {
	if (sum(input.slice(i, i + 3)) > sum(input.slice(i - 1, i + 2))) {
		count++;
	}
}

output(count).forTest(5);
