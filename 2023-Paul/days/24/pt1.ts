import { loadTrimmed, output, IS_TEST} from "aocutils";

const input = loadTrimmed().replaceAll(/\ /g,"").split("\n").map(i=>i.split("@").map(i=>i.split(",").map(i=>Number(i))));

let min = IS_TEST ? 7 : 200000000000000;
let max = IS_TEST ? 27 : 400000000000000;

let count = 0;

for (let i=0;i<input.length-1;i++) {
	for (let j=i+1;j<input.length;j++) {
		//let t = (input[i][0][0] - input[j][0][0])/(input[j][1][0]-input[i][1][0]); //time when x coords are the same!
		let x = (input[i][0][1]-input[j][0][1]+(input[j][0][0]*input[j][1][1]/input[j][1][0])-(input[i][0][0]*input[i][1][1]/input[i][1][0]))/(input[j][1][1]/input[j][1][0]-input[i][1][1]/input[i][1][0])
		let y = input[i][1][1]*x/input[i][1][0]+input[i][0][1]-input[i][0][0]*input[i][1][1]/input[i][1][0];
		let ti = (x-input[i][0][0])/input[i][1][0];
		let tj = (x-input[j][0][0])/input[j][1][0];
		if (x>=min && x<=max && y>=min && y<=max && ti>=0 && tj>=0) {
			count++;
			//console.log(input[i],input[j],x,y,ti,tj);
		}
	}
}


output(count).forTest(2);
