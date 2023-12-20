import { loadTrimmed, output } from "aocutils";

function smudges (str1,str2) {
	//console.log(str1,str2);

	if (str2 == undefined) {return 2}
	str1 = str1.split("");
	str2 = str2.split("");
	let ans = str1.filter((i,n)=>i!=str2[n]).length;
	return ans;
}

const input = loadTrimmed().split("\n\n").map(i=>i.split("\n"));

let sum = 0;

for (let grid of input) {
	let found = false;
	let i=0;
	let noOfSmudges = 0;
	loop: while (i<grid.length-1) {
		while (smudges(grid[i],grid[i + 1])>1 && i < grid.length - 1) {
			i++;
		}
		if (smudges(grid[i],grid[i + 1])<2) {
			noOfSmudges+=smudges(grid[i],grid[i + 1]);
			let mirror = true;
			let limit = Math.max(2 * i + 2 - grid.length,0);
			//console.log("limit = " + limit);
			let k = i + 2;
			for (let j = i - 1; j >= limit; j--) {
				//console.log(j,k);
				if (smudges(grid[j],grid[k])>1) {
					mirror = false
				}
				noOfSmudges+=smudges(grid[j],grid[k]);
				k++;
			}
			if (mirror == true && noOfSmudges==1) {
				sum += (i+1)*100;
				console.log((i+1)*100,sum);
				found = true;
				break loop;
			}
			i++;
		}
	}
	if (!found) {
		grid = grid[0].split("").map((_, colIndex) => grid.map(row => row[colIndex])).map(i=>i.join(""));
		//console.log(grid);

		let i=0;
		noOfSmudges = 0;
		loop2: while (i<grid.length-1) {
			while (smudges(grid[i],grid[i + 1])>1 && i < grid.length - 1) {
				i++;
			}
			if (smudges(grid[i],grid[i + 1])<2) {
				noOfSmudges+=smudges(grid[i],grid[i + 1]);
				let mirror = true;
				let limit = Math.max(2 * i + 2 - grid.length,0);
				//console.log(limit);
				let k = i + 2;
				for (let j = i - 1; j >= limit; j--) {
					//console.log(j,k);
					if (smudges(grid[j],grid[k])>1) {
						mirror = false
					}
					noOfSmudges+=smudges(grid[j],grid[k]);
					k++;
				}
				if (mirror == true && noOfSmudges==1) {
					sum += i+1;
					console.log(i+1,sum);
					found = true;
					break loop2;
				}
				i++;
			}
		}
	}
	if (!found) {console.log("fail")};

}


output(sum).forTest(400);
