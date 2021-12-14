
import fs  from "fs";

let lines = new Array();
let size = 0;

export function Part1() {

  lines = fs.readFileSync("./inputs/9.txt","utf8").trim().split("\n").map(i=>i.split("").map(j=>Number(j)));
  
  let score = 0;

  for (let r = 0;r<lines.length;r++) {
    for (let c = 0;c<lines[0].length;c++) {
      let lows = 0;
      if (r == 0 || lines[r-1][c]>lines[r][c]) {lows++};
      if (c == 0 || lines[r][c-1]>lines[r][c]) {lows++};
      if (r == lines.length-1 || lines[r+1][c]>lines[r][c]) {lows++};
      if (c == lines[0].length-1 || lines[r][c+1]>lines[r][c]) {lows++};
      if (lows == 4) {score+=1+lines[r][c]}
    }
  }
  console.log(score);

}

function checkAround (row: number,column: number) {
  lines[row][column] = 9;
  size++;
  if (row>0 && lines[row-1][column]<9) {checkAround (row-1,column)};
  if (row<lines.length-1 && lines[row+1][column]<9) {checkAround (row+1,column)};
  if (column>0 && lines[row][column-1]<9) {checkAround (row,column-1)};
  if (column<lines[0].length-1 && lines[row][column+1]<9) {checkAround (row,column+1)};
}

export function Part2() {

  lines = fs.readFileSync("./inputs/9.txt","utf8").trim().split("\n").map(i=>i.split("").map(j=>Number(j)));
  
  let basinSizes = [];
  
  for (let r = 0;r<lines.length;r++) {
    for (let c = 0;c<lines[0].length;c++) {
      if (lines[r][c] < 9) {
        size = 0;
        checkAround(r,c);
        basinSizes.push(size);
      }
    }
  }
  basinSizes.sort((a,b)=>b-a);
  console.log(basinSizes.slice(0,3).reduce((a,b)=>a*b,1));

}

