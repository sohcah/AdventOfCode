import {output, loadLines} from "aocutils";

const idMap = new Map<string, number>();
let latestId = 0;
function getId(label: string) {
    if(!idMap.has(label)) {
        idMap.set(label, latestId++);
    }
    return idMap.get(label)!;

}

const input = loadLines().map(i=>i.match(/[A-Z]{2}|[0-9]+/g)).map(i=> [getId(i[0]), Number(i[1]), ...i.slice(2).map(getId)] as const).sort((a,b)=>b[1]-a[1]);

//console.log(input.join("\n"));

const AAID = getId("AA");
//console.log("AAID", AAID);

// create distance matrix

// initialise it with Infinity and 0s
let distMatrix = [];
for (let i=0;i<input.length;i++) {
    let row = [];
    for (let j=0;j<input.length;j++) {
        row.push(i===j? 0:Infinity);
    }
    distMatrix.push(row);
}


// put in 1s

for (let i=0;i<input.length;i++) {
    for (let j=2;j<input[i].length;j++) {
        distMatrix[input[i][0]][input[i][j]] = 1;
    }
}

// iterate to fill

let changed = true;
while (changed) {
    changed = false;
    for (let i=0;i<input.length-1;i++) {
        for (let j=i+1;j<input.length;j++) {
            let min = Infinity;
            for (let k=0;k<input.length;k++) {
                const sum = distMatrix[i][k]+distMatrix[j][k];
                if (sum<min) {min=sum}
            }
            if (min<distMatrix[i][j]) {
                distMatrix[i][j] = min;
                distMatrix[j][i] = min;
                changed = true;
            }
        }
    }
}

//console.log(distMatrix.map(i=>i.map(j=>(j===Infinity?"Inf":j.toString()).padStart(4, " ")).join(" ")).join("\n"))

function nextPath(visited:number[],rem:number[],time:number,score:number) {
    // console.log(from,rem,time,score);
    for (let i = 0; i < rem.length; i++) {
        const newTime = time - 1 - distMatrix[input[visited[0]][0]][input[rem[i]][0]];
        const newScore = score + Math.max(0, newTime) * input[rem[i]][1]
        if (newTime>0 && rem.length>1) {
            nextPath([rem[i], ...visited], [
                ...rem.slice(0, i),
                ...rem.slice(i + 1)
            ], newTime, newScore);
        } else {
            if(process.env.AOCTEST) console.log(visited,newScore);
            results.push([visited,newScore]);
        }
    }
}

let remaining = [];
for (let i=0;input[i][1]>0;i++) {
    remaining.push(i);
}

let answer = 0;
let results = [];
nextPath([input.findIndex(i => i[0] === AAID)],remaining,26,0);


results.sort((a,b)=>b[1]-a[1]);

console.log(results.length);
for (let i=0;i<results.length-1;i++) {
    for (let j=i+1;j<results.length;j++) {
        let mutuallyExclusive = true;
        for (let k=0;k<results[i][0].length-1;k++) {
            if (results[j][0].includes(results[i][0][k])) {
                mutuallyExclusive = false;
            }
        }
        if (mutuallyExclusive) {
            const res = results[i][1]+results[j][1];
            if(res > answer) {
                answer = res;
                console.log(answer);
            }
        }
    }
}

output(answer).forTest(1707);
