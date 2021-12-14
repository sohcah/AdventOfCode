
import fs  from "fs";

export function Part1() {

  const lines = fs.readFileSync("./inputs/8.txt","utf8").trim().split(/[\n|]+/);
  
  let outputs = lines.filter(i => lines.indexOf(i) % 2 == 1).join(" ").match(/[a-g]+/g)?.map(i=>i.length);
 
  console.log(outputs);
  console.log(outputs!.reduce((a,b)=>a+Number(b == 2 || b == 3 || b == 4 || b == 7),0));
  

}

export function Part2() {

  const lines = fs.readFileSync("./inputs/8.txt","utf8").trim().split(/[\n|]+/).map(i=>i.trim()).map(i=>i.split(" ").map(j=>j.split("").sort().join("")));
  
  let answer = 0;
  
  for (let n = 0;n<lines.length;n+=2) {
    lines[n].sort((a, b) => a.length - b.length);
    let decode = [1,7,4,0,0,0,0,0,0,8];
    let maybe235 = lines[n].slice(3,6);
    let is3 = maybe235.filter(str=>str.includes(lines[n][0][0]) && str.includes(lines[n][0][1]))[0];
    let is5 = "";
    let is2 = "";
    for (const i of maybe235) {
      if (i!=is3) {
        let count = 0;
        for (let j=0;j<4;j++) {
          if (i.includes(lines[n][2][j])) {count++};
        }
        if (count == 3) {is5 = i} else {is2 = i};
      }
    }

    let maybe069 = lines[n].slice(6,9);
    let is6 = maybe069.filter(str=>!str.includes(lines[n][0][0]) || !str.includes(lines[n][0][1]))[0];
    let is9 = maybe069.filter(str=>str.includes(lines[n][2][0]) && str.includes(lines[n][2][1]) && str.includes(lines[n][2][2]) && str.includes(lines[n][2][3]))[0];
    decode[lines[n].indexOf(is3)] = 3;
    decode[lines[n].indexOf(is5)] = 5;
    decode[lines[n].indexOf(is2)] = 2;
    decode[lines[n].indexOf(is6)] = 6;
    decode[lines[n].indexOf(is9)] = 9;
    
    let output = 0;
    for (const i of lines[n+1]) {
      output = output * 10 + decode[lines[n].indexOf(i)];
    }
    

    answer+= output;
  
  }

console.log(answer);
}
