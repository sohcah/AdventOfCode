import {output, loadLines} from "aocutils";

const input = loadLines().map(i=>i.match(/-?[0-9]+/g).map(Number));

function mDist (quad) {
    return Math.abs(quad[2]-quad[0])+Math.abs(quad[3]-quad[1]);
}

let answer = 0;
let y = process.env.AOCTEST?10:2000000;
let ranges = [];
let beacons = new Set<number>();

console.log(input);

for (const line of input) {
    let plusMinus = mDist(line)-Math.abs(y-line[1]);
    if (plusMinus>=0) {
        ranges.push([line[0] - plusMinus, line[0] + plusMinus])
    }
    if (line[3]===y) {
        beacons.add(line[2]);
    }
}

ranges.sort((a,b)=>a[0]-b[0]);

console.log(ranges);

for (let i=0;i<ranges.length-1;i++) {
    if (ranges[i][1]>=ranges[i+1][0]-1) {
        ranges[i][1]=Math.max(ranges[i][1],ranges[i+1][1]);
        ranges.splice(i+1, 1);
        i--
    }
}

console.log(ranges);

for (const r of ranges) {
    answer+=r[1]-r[0]+1;
}
answer -= beacons.size;

output(answer).forTest(26);
