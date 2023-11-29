import {output, loadLines} from "aocutils";

const input = loadLines().map(i=>i.match(/-?[0-9]+/g).map(Number));

function mDist (quad) {
    return Math.abs(quad[2]-quad[0])+Math.abs(quad[3]-quad[1]);
}

let answer = 0;
let limit = process.env.AOCTEST?20:4000000;


for (let y=0;y<=limit;y++) {
    let ranges = [];

    for (const line of input) {
        let plusMinus = mDist(line) - Math.abs(y - line[1]);
        if (plusMinus >= 0) {
            ranges.push([line[0] - plusMinus, line[0] + plusMinus])
        }
    }

    ranges.sort((a, b) => a[0] - b[0]);


    for (let i = 0; i < ranges.length - 1; i++) {
        if (ranges[i][1] >= ranges[i + 1][0] - 1) {
            ranges[i][1] = Math.max(ranges[i][1], ranges[i + 1][1]);
            ranges.splice(i + 1, 1);
            i--
        }
    }


    for (let i=1;i<ranges.length;i++) {
        if (ranges[i-1][1]>=0 && ranges[i-1][1]<=limit) {
            answer = (ranges[i-1][1]+1)*4000000+y;
        }
    }

}

output(answer).forTest(56000011);
