
import fs  from "fs";

export function Part1() {

  const lines = fs.readFileSync("./inputs/7.txt","utf8").trim().split(",").map(i=>Number(i));
  let median = 0;

  lines.sort((a, b) => (a - b));
  if (lines.length % 2 == 1) {
    median = lines[(lines.length-1)/2]
  }
  else {
    median = (lines[(lines.length-2)/2]+lines[(lines.length)/2])/2
  }
  let fuel = lines.reduce((a,b)=>a+Math.abs(b-median),0)
  console.log(lines,median,fuel);
}

export function Part2() {

  const lines = fs.readFileSync("./inputs/7.txt","utf8").trim().split(",").map(i=>Number(i));
  let mean = Math.round(lines.reduce((a,b)=>a+b,0)/lines.length);
  let fuel = 0;
  let minFuel = 1000000000;
  let minItem = 0;
  for (let i = Math.round(mean/2); i<=mean*1.5;i++) {
    fuel = lines.reduce((a,b)=>a+Math.abs(b-i)*(Math.abs(b-i)+1)/2,0);
    if (fuel<minFuel) {
      minFuel = fuel;
      minItem = i;
    };
    console.log(i,fuel);
  }
  
  console.log(minItem,minFuel);
}
