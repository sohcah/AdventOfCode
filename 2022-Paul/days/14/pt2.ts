import {output, loadLines} from "aocutils";

const input = loadLines().map(i=>i.split(" -> ").map(i=>i.split(",").map(Number)));

const rock = new Set<number>();
const sand = new Set<number>();
let path = [];
let maxY = 0;

for (const item of input) {
    if (item[0][1]>maxY) {
        maxY = item[0][1]
    }
    for (let i=0;i<item.length-1;i++) {
        if (item[i+1][1]>maxY) {
            maxY = item[i+1][1]
        }
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

for (let i=0;i<1000;i++) {
    rock.add((maxY+2)*1000+i);
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
        if (posValue===500) {break}
        posValue = path.pop();
    }
}

// Loop through Y coords from top to bottom
    // Inside loop, create empty string
    // Loop through X coords from left to right
        // Add coordinate value to empty string (either # or whatever)
    // Log string
for (let y=0;y<=maxY+2;y++) {
    let row = "";
    for (let x=500-maxY-3;x<=500+maxY+3;x++) {
        if (sand.has(x+y*1000)) {
            row += "O"
        } else if (rock.has(x+y*1000)) {
            row += "#"
        } else {
            row += " "
        }
    }
    console.log(row);
}

let answer = sand.size;

output(answer).forTest(93);
