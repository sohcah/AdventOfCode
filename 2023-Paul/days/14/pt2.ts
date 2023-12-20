import { loadTrimmed, output } from "aocutils";

let grid: string[];

const input = loadTrimmed().split("\n");
grid = input;
grid = grid[0].split("").map((_, colIndex) => grid.map(row => row[colIndex])).map(i=>i.reverse().join(""));


//console.log(grid);
let chunk = 1000;
let sum;
let results = [];

for (let cycles=0;cycles<chunk;cycles++) {
	for (let rotate = 0; rotate < 4; rotate++) {
		for (let j = 0; j < grid.length; j++) {
			let moves = true;
			while (moves == true) {
				moves = false;
				let i = 0;
				while (i < grid[j].length) {
					i = grid[j].indexOf("O", i);
					if (i == -1) {
						break
					}
					;
					if (grid[j][i + 1] == ".") {
						grid[j] = grid[j].slice(0, i) + ".O" + grid[j].slice(i + 2);
						i++;
						moves = true;
					}
					i++;
				}
			}
		}

		//console.log(grid);

		grid = grid[0].split("").map((_, colIndex) => grid.map(row => row[colIndex])).map(i => i.reverse().join(""));

		//console.log(grid);

	}

	sum = 0;
	for (let j = 0; j < grid.length; j++) {
		sum += grid[j].split("").reduce((a, b, n) => a + (b === "O" ? n + 1 : 0), 0);
	}
	results.push(sum);
}

// console.log(results);

let cycleLen = 1;
while (JSON.stringify(results.slice(chunk-cycleLen,chunk))!=JSON.stringify(results.slice(chunk-cycleLen*2,chunk-cycleLen)) || JSON.stringify(results.slice(chunk-cycleLen*2,chunk-cycleLen))!=JSON.stringify(results.slice(chunk-cycleLen*3,chunk-cycleLen*2))) {

	console.log();
	cycleLen++;
}
console.log(results.slice(chunk-cycleLen,chunk));
console.log(cycleLen);

let introLen = chunk % cycleLen+cycleLen*10;


let answer = results[introLen-1 +(1000000000-introLen) % cycleLen];

output(answer).forTest(64);
