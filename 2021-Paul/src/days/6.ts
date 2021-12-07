
import fs  from "fs";

export function Part1() {

  const lines = fs.readFileSync("./inputs/6.txt","utf8").trim().split(",").map(i=>Number(i));
  
  const days = 256;
  
  for (let i=0;i<days;i++) {
    for (let j=0;j<lines.length;j++) {
      lines[j]--;
    }
    for (let j=0;j<lines.length;j++) {
      if (lines[j]==-1) {
        lines[j]=6;
        lines.push(8);
      }
    }
  }
  
  console.log(lines.length);
}

export function Part2() {

  const lines = fs.readFileSync("./inputs/6.txt","utf8").trim().split(",").map(i=>Number(i));
  
  const days = 256;
  let frequency = [0,0,0,0,0,0,0,0,0];
  let newCycle=0;
  
  for (let j=0;j<lines.length;j++) {
    frequency[lines[j]]++;
  }
  
  for (let i=0;i<days;i++) {
    newCycle=frequency.shift()!;
    frequency.push(newCycle);
    frequency[6]+=newCycle;
  }
  console.log(frequency);
  console.log(frequency.reduce((a,b)=>a+b,0));
}
