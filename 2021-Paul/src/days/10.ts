
import fs  from "fs";

export function Part1() {

  const lines = fs.readFileSync("./inputs/10.txt","utf8").trim().split("\n");
  
  let length;
  let index;
  let invalid = ")]}>";
  let value = [3,57,1197,25137];
  let points = 0;

  for (let i = 0;i<lines.length;i++) {
    length = 0;
    while (lines[i].length != 0 && lines[i].length != length) {
      length = lines[i].length;
      lines[i] = lines[i].replace(/(\(\))|(\[\])|(\<\>)|(\{\})/g,"");
    }
    index = lines[i].search(/[\}\]\>\)]/g);
    if (index !=-1) {
      points += value[invalid.indexOf(lines[i][index])];
    }
    console.log(lines[i]);
  }

  console.log(points);
}

export function Part2() {

  const lines = fs.readFileSync("./inputs/10.txt","utf8").trim().split("\n");
  
  let length;
  let index;
  let pointsByIndex = " ([{<";
  let points = [];

  for (let i = 0;i<lines.length;i++) {
    length = 0;
    while (lines[i].length != 0 && lines[i].length != length) {
      length = lines[i].length;
      lines[i] = lines[i].replace(/(\(\))|(\[\])|(\<\>)|(\{\})/g,"");
    }
    index = lines[i].search(/[\}\]\>\)]/g);
    if (index ==-1) {
      let total = 0;
      for (let j=lines[i].length-1;j>=0;j--) {
        total = total*5 + pointsByIndex.indexOf(lines[i][j]);
      }
      points.push(total);
    }
    
  }
  points.sort((a,b) => a - b);

  console.log(points[(points.length-1)/2]);
}

