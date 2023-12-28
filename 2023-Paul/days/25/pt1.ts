import { IS_TEST, loadTrimmed, output } from "aocutils";

const input = loadTrimmed().split("\n").map(i=>i.split(": ").map(i=>i.split(" ")));

function nodeSwap(i,j) {
	let node = nodes[i];
	nodes[i] = nodes[j];
	nodes[j] = node;
	let row = connects[i].slice();
	connects[i] = connects[j].slice();
	connects[j] = row.slice();
	for (let n=0;n<nodes.length;n++) {
		let value = connects[n][i];
		connects[n][i] = connects[n][j];
		connects[n][j] = value;
	}
}

let answer;
let nodes = [];
const SIZE = IS_TEST ? 15 : 1535;
let connects = Array(SIZE).fill(SIZE).map(() => Array(SIZE).fill(0)); //15 or 1535

for (const line of input) {
	if (!nodes.includes(line[0][0])) {
		nodes.push(line[0][0]);
	}
	let current = nodes.indexOf(line[0][0]);
	for (let i = 0;i<line[1].length;i++) {
		if (!nodes.includes(line[1][i])) {
			nodes.push(line[1][i]);
		}
		let next = nodes.indexOf(line[1][i]);
		connects[current][next] = 1;
		connects[next][current] = 1;
	}
}

for (let i = 3;i<nodes.length;i++) {
	let j = 0;
	let l = nodes.length-1;
	while (connects[j].slice(0,i).reduce((a,b)=>a+b, 0)>1) {
		j++;
	}
	for (let k=j;k<l;k++) {
		if (connects[k].slice(0,i).reduce((a,b)=>a+b, 0) > 1) {
			nodeSwap(j,k);
			//console.log(j,k);
			j++;
		} else if (connects[k].slice(0,i).reduce((a,b)=>a+b, 0) == 0) {
			nodeSwap(k,l);
			//console.log(k,l);
			l--;
			k--;
		}
	}
	if (i==j) {
		let m = j;
		while (connects[m].slice(0, i).reduce((a, b) => a + b, 0) == 1) m++;
		if (m - j == 3) {
			console.log(i, j);
			answer = IS_TEST ? i * (15 - i) : i * (1535 - i);
			break;
		}
	}
	//console.log(i);
}



// for (let i=0;i<nodes.length;i++) {
// 	console.log(i.toString().padStart(4),connects[i].map(i => i ? "#" : " ").join(""),connects[i].reduce((a,b)=>a+b, 0)); //nodes[i],
// }

output(answer).forTest(54);

// nodeSwap(4,13);
// nodeSwap(5,8);
// nodeSwap(6,12);
// nodeSwap(7,11);
// nodeSwap(8,12);
// nodeSwap(7, 8);
// nodeSwap(3, 6);
