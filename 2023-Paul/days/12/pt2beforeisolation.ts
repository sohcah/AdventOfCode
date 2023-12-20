import { loadTrimmed, output } from "aocutils";

let line: [string, number[]];
let count: number;
let lPos: number[];

function place(itemNo: number, earliest: number) {//, info: string = "") {
	if (itemNo == line[1].length) {
		//console.log("yes!", line[0].slice(0, earliest), info);
		if (!line[0].slice(earliest).includes("#")) {
			count++;
		}
	} else {
		let i = earliest;
		const len = line[1][itemNo];
		outer: while (i <= lPos[itemNo]) {
			while(line[0].slice(i, i + len).includes(".") && i < lPos[itemNo]) {
				if (line[0][i - 1] === "#") break outer;
				i++;
			}
			if (line[0][i - 1] === "#") break;
			if (
				!line[0].slice(i, i + len).includes(".") &&
				(line[0][i - 1] != "#") &&
				(line[0][i + len] != "#")
			) {
				//console.log(i, itemNo + 1, i + len + 1);
				place(itemNo + 1, i + len + 1); // , info + `|${".".repeat(i - earliest)}${"#".repeat(len)}.`);
			}
			i++;
		}
	}
}

const input = loadTrimmed()
	.split("\n")
	.map((i) => i.split(" ").map((i, n) => (n === 0 ? i+"?"+i+"?"+i+"?"+i+"?"+i : (i+","+i+","+i+","+i+","+i).split(",").map((i) => Number(i))))) as [
	string,
	number[],
][];

//console.log(input);

let sum = 0;
let index = 0;

for (line of input) {
	let e = 0;
	//ePos = [];
	lPos = [];
	const space = line[0].length - (line[1].reduce((a, b) => a + b, 0) + line[1].length - 1);
	for (let i = 0; i < line[1].length; i++) {
		//ePos.push(e);
		lPos.push(e + space);
		e += line[1][i] + 1;
	}
	// console.log(lPos);
	count = 0;
	place(0, 0);
	index++;
	console.log(`${index.toString().padStart(4)} / ${input.length} -`, count);
	sum += count;
}

output(sum).forTest(525152);
