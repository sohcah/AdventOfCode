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

function nextPath(from:number,rem:number[],time:number,score:number) {
    if (time>0 && rem.length>0) {
        // console.log(from,rem,time,score);
        for (let i = 0; i < rem.length; i++) {
            // console.table({
            //     "input[from]": input[from],
            //     from,
            //     rem,
            //     i,
            //     "input[rem[i]][0]": input[rem[i]][0],
            //     "distMatrix[input[from][0]]": distMatrix[input[from][0]]
            // })
            const newTime = time - 1 - distMatrix[input[from][0]][input[rem[i]][0]];
            // process.exit(1);
            nextPath(rem[i], [
                ...rem.slice(0, i),
                ...rem.slice(i + 1)
            ], newTime, score + Math.max(0, newTime) * input[rem[i]][1]);
        }
    } else {
        // console.log(from,rem,time,score);
        // console.log();
        if (score>answer) {
            answer = score;
            // console.log(answer);
        }
        // process.exit();
    }
}

let remaining = [];
for (let i=0;input[i][1]>0;i++) {
    remaining.push(i);
}

let answer = 0;
nextPath(input.findIndex(i => i[0] === AAID),remaining,30,0);


output(answer).forTest(1651);
