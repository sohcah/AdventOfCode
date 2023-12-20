import { loadTrimmed, output } from "aocutils";

const input = loadTrimmed().split("\n\n").map(i=>i.split("\n"));

let sum = 0;

for (let grid of input) {
	let found = false;
	let i=0;
	loop: while (i<grid.length-1) {
		while (grid[i] != grid[i + 1] && i < grid.length - 1) {
			i++;
		}
		if (grid[i] == grid[i + 1]) {
			let mirror = true;
			let limit = Math.max(2 * i + 2 - grid.length,0);
			console.log(limit);
			let k = i + 2;
			for (let j = i - 1; j >= limit; j--) {
				console.log(j,k);
				if (grid[j] != grid[k]) {
					mirror = false
				}
				k++;
			}
			if (mirror == true) {
				sum += (i+1)*100;
				console.log(grid, i,sum);
				found = true;
				break loop;
			}
			i++;
		}
	}
	if (!found) {
		grid = grid[0].split("").map((_, colIndex) => grid.map(row => row[colIndex])).map(i=>i.join(""));
		console.log(grid);

		let i=0;
		loop2: while (i<grid.length-1) {
			while (grid[i] != grid[i + 1] && i < grid.length - 1) {
				console.log(i);
				i++;
			}
			console.log("here",i);
			if (grid[i] == grid[i + 1]) {
				let mirror = true;
				let limit = Math.max(2 * i + 2 - grid.length,0);
				console.log(1,limit);
				let k = i + 2;
				for (let j = i - 1; j >= limit; j--) {
					console.log(1,j,k);
					if (grid[j] != grid[k]) {
						mirror = false
					}
					k++;
				}
				if (mirror == true) {
					sum += i+1;
					console.log(grid, i,sum);
					found = true;
					break loop2;
				}
				i++;
			}
		}
	}


}


output(sum).forTest(405);
