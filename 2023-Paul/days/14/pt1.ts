import { loadTrimmed, output } from "aocutils";

let grid: string[];

const input = loadTrimmed().split("\n");
grid = input;
grid = grid[0].split("").map((_, colIndex) => grid.map(row => row[colIndex])).map(i=>i.reverse().join(""));


console.log(grid);

let sum = 0;

for (let j=0;j<grid.length;j++) {
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
	sum+=grid[j].split("").reduce((a,b,n)=> a+(b==="O" ? n+1 : 0),0);
}


output(sum).forTest(136);
