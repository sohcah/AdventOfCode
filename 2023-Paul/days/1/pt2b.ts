import { loadTrimmed, output, sum } from "aocutils";

const input = loadTrimmed();
const lines = input.split("\n");

console.log(lines);

const lookFor = [
	["0", "zero"],
	["1", "one"],
	["2", "two"],
	["3", "three"],
	["4", "four"],
	["5", "five"],
	["6", "six"],
	["7", "seven"],
	["8", "eight"],
	["9", "nine"],
];

let sum = 0;
for (const line of lines) {
	console.log(line);
	let minIndex = [Infinity, ""] as [number, string];
	let maxIndex = [-Infinity, ""] as [number, string];
	for (const pair of lookFor) {
		for (const num of pair) {
			const firstIndex = line.indexOf(num);
			if (firstIndex !== -1 && firstIndex < minIndex[0]) minIndex = [firstIndex, pair[0]];
			const lastIndex = line.lastIndexOf(num);
			if (lastIndex !== -1 && lastIndex > maxIndex[0]) maxIndex = [lastIndex, pair[0]];
		}
	}
	sum += Number(`${minIndex[1]}${maxIndex[1]}`);

	// Loop: for (let i = 0; i < line.length; i++) {
	// 	for (const pair of lookFor) {
	// 		for (const num of pair) {
	// 			if (line.slice(i, i + num.length) == num) {
	// 				sum += Number(pair[0]) * 10;
	// 				console.log(sum);
	// 				break Loop;
	// 			}
	// 		}
	// 	}
	// }
	// Loop: for (let i = line.length - 1; i >= 0; i--) {
	// 	for (const pair of lookFor) {
	// 		for (const num of pair) {
	// 			if (line.slice(i, i + num.length) == num) {
	// 				sum += Number(pair[0]);
	// 				console.log(sum);
	// 				break Loop;
	// 			}
	// 		}
	// 	}
	// }
}

output(sum).forTest(281).forActual(54504);
