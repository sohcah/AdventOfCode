import {output, loadLines} from "aocutils";

const input = loadLines().map(i=>i.split(" -> ").map(i=>i.split(",").map(Number)));

const rock = new Set<number>();
const sand = new Set<number>();
let path = [];


for (const item of input) {
    for (let i=0;i<item.length-1;i++) {
        if (item[i][0] === item[i + 1][0]) {
            if (item[i][1] > item[i + 1][1]) {
                for (let j = item[i][1]; j >= item[i + 1][1]; j--) {
                    rock.add(item[i][0] + 1000 * j);
                }
            } else {
                for (let j = item[i][1]; j <= item[i + 1][1]; j++) {
                    rock.add(item[i][0] + 1000 * j);
                }
            }
        } else {
            console.log(item[i][0],item[i+1][0]);
            if (item[i][0]>item[i+1][0]) {
                for (let j = item[i][0]; j >= item[i + 1][0]; j--) {
                    rock.add(j + 1000 * item[i][1]);
                }
            } else {
                for (let j=item[i][0];j<=item[i+1][0];j++) {
                    rock.add(j+1000*item[i][1]);
                }
            }
        }
    }
}

let posValue=500;

while (Math.floor(posValue/1000)<200) {
    path.push(posValue);
    if (!rock.has(posValue+1000) && !sand.has(posValue+1000)) {
        posValue+=1000;
    } else if (!rock.has(posValue+999) && !sand.has(posValue+999)) {
        posValue+=999;
    }  else if (!rock.has(posValue+1001) && !sand.has(posValue+1001)) {
        posValue+=1001;
    } else {
        sand.add(posValue);
        path.pop();
        posValue = path.pop();
    }
}


let answer = sand.size;

output(answer).forTest(24);
