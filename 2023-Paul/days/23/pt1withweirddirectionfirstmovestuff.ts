import { loadTrimmed, output } from "aocutils";

const input = loadTrimmed().split("\n").map(i=>i.split("").map(i=>".>v#".indexOf(i)));

//There are no ^ or < for some reason!


const size = input[0].length; //always a square!
let nodes = [];
let twoWayTable = Array(40).fill().map(() => Array(40).fill(0)); // distance
function nextNode(d,a, direction) {
	let lastD = d;
	let lastA = a;
	let dist
	// console.log("NEXTNODE", lastD, lastA, direction);
	if (direction == 4) {dist = 0} else {dist = 1};
	if (direction == 0) {d--};
	if (direction == 1) {a++};
	if (direction == 2) {d++};
	if (direction == 3) {a--};

	let firstMove = true;
	let oneWay = false;
	let surround = [5,5,5,0]; //up,right,down,left (although this one is just a random starter)
	// for (let i = 0;i<size;i++) {
	// 	console.log(input[i].map(i=>".>v#X+"[i]).join(""));
	// }
	// console.log(surround, surround.filter((i,n)=>i>2&&(!firstMove||(n+2)%4!=direction||i==5)).length);
	while (firstMove||surround.filter((i,n)=>i>2||(n+2)%4==direction).length == 3) {
		if (input[d][a] == 1 || input[d][a] == 2) {
			oneWay = true;
		}
		surround = [];
		if (d > 0) {
			surround.push(input[d - 1][a]);
		} else {
			surround.push(3);
		}
		if (a < size - 1) {
			surround.push(input[d][a + 1]);
		} else {
			surround.push(3);
		}
		if (d < size - 1) {
			surround.push(input[d + 1][a]);
		} else {
			surround.push(3);
		}
		if (a > 0) {
			surround.push(input[d][a - 1]);
		} else {
			surround.push(3);
		}
		// ((lastD===19&&lastA===13,true)?console.log(d,a,direction,surround,surround.filter((i,n)=>i>2||(n+2)%4==direction).length):0)
		if (surround.filter((i,n)=>i>2||(n+2)%4==direction).length == 3) {
			input[d][a] = 4;
			let dir = surround.findIndex((i,n)=>i<3&&(n+2)%4!=direction);
			// console.log("going in", dir);
			dist++;
			switch (dir) {
				case 0:
					d--;
					break;
				case 1:
					a++;
					break;
				case 2:
					d++;
					break;
				case 3:
					a--;
					break;
			}
		}
		firstMove = false;
	}
	console.log(`From (${lastD},${lastA}) to (${d},${a}), distance ${dist}, one way? ${oneWay}`);
	// (lastD===19&&lastA===13?(console.log(surround),process.exit(0)):0)
	nodes.push(d*size+a);
	twoWayTable[nodes.indexOf(lastD*size+lastA)][nodes.indexOf(d*size+a)] = dist;
	if (!oneWay) {
		twoWayTable[nodes.indexOf(d*size+a)][nodes.indexOf(lastD*size+lastA)] = dist;
		console.log(`2 way path found! From (${lastD},${lastA}) to (${d},${a})`)
	}
	// input[d][a] = 5;
	if (d!=size-1) {
		if (surround[0] == 0) {
			nextNode(d , a,0);
		}
		if (surround[1] < 3) {
			nextNode(d , a,1);
		}
		if (surround[2] < 3) {
			nextNode(d , a,2);
		}
		if (surround[3] == 0) {
			nextNode(d , a ,3);
		}
	}
}

let startD = 0;
let startA = input[0].indexOf(0);

nodes.push(startD*size+startA);

nextNode(startD,startA,4);

console.log(nodes.map(i=>[Math.floor(i/size),i % size]));
console.log(twoWayTable);

for (let i = 0;i<size;i++) {
	console.log(input[i].map(i=>".>v#X+"[i]).join(""));
}

output().forTest(94);
