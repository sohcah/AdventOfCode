import { loadTrimmed, output } from "aocutils";

function smudges (str1,str2) {
	//console.log(str1,str2);

	if (str2 == undefined) {return 2}
	let ans = str1.split("").filter((i,n)=>i!=str2[n]).length;
	return ans;
}

const input = loadTrimmed().split("\n\n").map(i=>i.split("\n"));


let sum = 0;

for (let grid of input) {
	let found = false;

	loop: for (let mirrorAt=1;mirrorAt<grid.length;mirrorAt++) {
		let start = Math.max(0,mirrorAt*2-grid.length)
		//console.log(grid.slice(start,mirrorAt).join(""),grid.slice(mirrorAt,2*mirrorAt-start).reverse().join(""));
		if (smudges(grid.slice(start,mirrorAt).join(""),grid.slice(mirrorAt,2*mirrorAt-start).reverse().join("")) == 1) {
			//console.log(grid,mirrorAt);
			sum+=100*mirrorAt;
			found = true;
			break loop;
		}
	}
	if (!found) {
		grid = grid[0].split("").map((_, colIndex) => grid.map(row => row[colIndex])).map(i => i.join(""));
		loop: for (let mirrorAt=1;mirrorAt<grid.length;mirrorAt++) {
			let start = Math.max(0,mirrorAt*2-grid.length)
			//console.log(grid.slice(start,mirrorAt).join(""),grid.slice(mirrorAt,2*mirrorAt-start).reverse().join(""));
			if (smudges(grid.slice(start,mirrorAt).join(""),grid.slice(mirrorAt,2*mirrorAt-start).reverse().join("")) == 1) {
				//console.log(grid,mirrorAt);
				sum+=mirrorAt;
				found = true;
				break loop;
			}
		}
	}
	if (!found) {
		console.log(grid);
		throw ("error")
	}
}


output(sum).forTest(400).forActual(33183);
