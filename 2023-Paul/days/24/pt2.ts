import { loadTrimmed, output } from "aocutils";

const input = loadTrimmed().replaceAll(/\ /g,"").split("\n").map(i=>i.split("@").map(i=>i.split(",").map(i=>Number(i))));

let positions: number[][] = [];

for (let i=0;i<input.length;i++) {
	positions.push([]);
	let vel = input[i][1];
	let pos = input[i][0];
	let count = 0;
	while (pos[0]>0 && pos[1]>0 && pos[2]>0 && count<100000) {
		positions[i].push(pos);
		pos = pos.map((n, i) => n + vel[i])
		count++;
	}
	//console.log(i,positions[i]);
}

positions.sort((a,b)=>a.length-b.length);

for (let i=0;i<positions.length;i++) {
	//console.log(positions[i]);
}
console.log(positions[0].length);
console.log(positions[1].length);

output().forTest(0);
