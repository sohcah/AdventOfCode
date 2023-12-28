import { loadTrimmed, output } from "aocutils";

const input = loadTrimmed().split("\n").map(i=>i.split("").map(i=>".>v#".indexOf(i)));

//There are no ^ or < for some reason!


const size = input[0].length; //always a square!
let nodes = [];
let twoWayTable = Array(50).fill().map(() => Array(50).fill(0)); // distance
function nextNode(d,a, direction) {
	let lastD = d;
	let lastA = a;
	let prevD;
	let prevA;
	let dist
	// console.log("NEXTNODE", lastD, lastA, direction);
	if (direction == 4) {
		dist = 0;
		prevD = d-1;
		prevA = a;
	} else {
		dist = 1
		prevD = d;
		prevA = a;
	};
	if (direction == 0) {d--};
	if (direction == 1) {a++};
	if (direction == 2) {d++};
	if (direction == 3) {a--};


	let oneWay = false;
	let surround = [3,0,3,3]; //up,right,down,left (although this one is just a random starter)
	// for (let i = 0;i<size;i++) {
	// 	console.log(input[i].map(i=>".>v#X+"[i]).join(""));
	// }
	// console.log(surround, surround.filter((i,n)=>i>2&&(!firstMove||(n+2)%4!=direction||i==5)).length);
	while (surround.filter(i=>i>2).length == 3) {
		if (input[d][a] == 1 || input[d][a] == 2) {
			oneWay = true;
		}
		surround = [];
		if (d > 0) {
			if (d-1==prevD && a==prevA) {
				surround.push(3);
			} else {
				surround.push(input[d - 1][a]);
			}
		} else {
			surround.push(3);
		}
		if (a < size - 1) {
			if (d==prevD && a+1==prevA) {
				surround.push(3);
			} else {
				surround.push(input[d][a + 1]);
			}
		} else {
			surround.push(3);
		}
		if (d < size - 1) {
			if (d+1==prevD && a==prevA) {
				surround.push(3);
			} else {
				surround.push(input[d + 1][a]);
			}
		} else {
			surround.push(3);
		}
		if (a > 0) {
			if (d==prevD && a-1==prevA) {
				surround.push(3);
			} else {
				surround.push(input[d][a - 1]);
			}
		} else {
			surround.push(3);
		}
		// ((lastD===19&&lastA===13,true)?console.log(d,a,direction,surround,surround.filter((i,n)=>i>2||(n+2)%4==direction).length):0)
		if (surround.filter(i=>i>2).length == 3) {
			prevD = d;
			prevA = a;
			let dir = surround.findIndex((i)=>i<3);
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
	}
	//console.log(`From (${lastD},${lastA}) to (${d},${a}), distance ${dist}, one way? ${oneWay}`);
	// (lastD===19&&lastA===13?(console.log(surround),process.exit(0)):0)
	let nodeExists = nodes.includes(d*size+a)
	if (!nodeExists) {
		nodes.push(d*size+a);
	}
	twoWayTable[nodes.indexOf(lastD*size+lastA)][nodes.indexOf(d*size+a)] = dist;
	if (!oneWay) {
		twoWayTable[nodes.indexOf(d*size+a)][nodes.indexOf(lastD*size+lastA)] = dist;
		console.log(`2 way path found! From (${lastD},${lastA}) to (${d},${a})`)
	}
	//input[d][a] = 4;
	if (d!=size-1 && !nodeExists) {
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

function runTable(node: number,dist) {
	if (visited[node]) return;
	visited[node] = true;
	let finish = true;
	for (let i=0;i<nodes.length;i++) {
		if (twoWayTable[node][i]!=0) {
			runTable(i,dist+twoWayTable[node][i]);
			finish = false;
		}
	}
	if (finish) {
		// console.log(dist);
		distances.push(dist);
	}
	visited[node] = false;
}

let startD = 0;
let startA = input[0].indexOf(0);

nodes.push(startD*size+startA);

nextNode(startD,startA,4);



let i = 0;
while (Math.max(...twoWayTable[i])>0) {i++};
let finishNode = i;
i++;

for (let i=0;i<nodes.length;i++) {
	for (let j=0;j<nodes.length;j++) {
		if (j!=finishNode && twoWayTable[i][j]!=0) {
			twoWayTable[j][i] = twoWayTable[i][j];
		}
	}
}

console.log(nodes.map(i=>[Math.floor(i/size),i % size]));
for (let i = 0;i<twoWayTable.length;i++) {
	console.log(`[${Math.floor(nodes[i]/size)},${nodes[i] % size}] ${twoWayTable[i]}`);
}
//
// for (let i = 0;i<size;i++) {
// 	console.log(input[i].map(i=>".>v#X+"[i]).join(""));
// }

let visited = new Array(nodes.length).fill(false);
let distances = [];
runTable(0,0);
let answer = 0;
for(const dist of distances) {
	if (dist > answer) answer = dist;
}
// let answer = Math.max(...distances);

output(answer).forTest(94);

// From (0,1) to (5,3), distance 15, one way? true
// From (5,3) to (3,11), distance 22, one way? true
// From (3,11) to (11,21), distance 30, one way? true
// From (11,21) to (19,19), distance 10, one way? true
// From (19,19) to (22,21), distance 5, one way? true
// From (3,11) to (13,13), distance 24, one way? true
// From (13,13) to (11,21), distance 18, one way? true
// From (13,13) to (19,13), distance 10, one way? true
// From (19,13) to (19,19), distance 10, one way? true
// From (5,3) to (13,5), distance 22, one way? true
// From (13,5) to (13,13), distance 12, one way? true
// From (13,5) to (19,13), distance 38, one way? true

