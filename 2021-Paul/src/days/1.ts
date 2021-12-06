
import fs  from "fs";

export function Part1() {

  const lines = fs.readFileSync("./inputs/1.txt","utf8").trim().split("\n").map(i=>Number(i.trim()));
  let count = 0;
  for (let i = 1; i<lines.length; i++) {
    if (lines[i]>lines[i-1]) {count++}
  }
  console.log(count);
}

export function Part2() {

  const lines = fs.readFileSync("./inputs/1.txt","utf8").trim().split("\n").map(i=>Number(i.trim()));
  let count = 0;
  for (let i = 1; i<lines.length-2; i++) {
    if (lines[i]+lines[i+1]+lines[i+2]>lines[i-1]+lines[i]+lines[i+1]) {count++}
  }
  console.log(count);
}