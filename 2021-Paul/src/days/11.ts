
import fs  from "fs";

let lines = new Array();
let flashCount  = 0;

function flash (row: number, column: number) {
  lines[row][column] = 0;
  flashCount++;
  for (let a = Math.max(row-1,0);a<=Math.min(row+1,9);a++) {
    for (let b = Math.max(column-1,0);b<=Math.min(column+1,9);b++) {
      if (lines[a][b] != 0) {lines[a][b]++};
    }
  }

  for (let a = Math.max(row-1,0);a<=Math.min(row+1,9);a++) {
    for (let b = Math.max(column-1,0);b<=Math.min(column+1,9);b++) {
      if (lines[a][b] > 9) {
        flash(a,b);
      }
    }
  }
}

export function Part1() {

  lines = fs.readFileSync("./inputs/11.txt","utf8").trim().split("\n").map(i=>i.split("").map(j=>Number(j)));
  
  for (let steps = 0;steps<100;steps++) {

    for (let r=0;r<lines.length;r++) {
      for (let c = 0; c<lines[0].length;c++) {
        lines[r][c]++;
      }
    }

    for (let r=0;r<lines.length;r++) {
      for (let c = 0; c<lines[0].length;c++) {
        if (lines[r][c] > 9) {
          flash(r,c);
        }
      }
    }
  }
  
  console.log(flashCount);
  
}

export function Part2() {

  lines = fs.readFileSync("./inputs/11.txt","utf8").trim().split("\n").map(i=>i.split("").map(j=>Number(j)));
  
  let steps = 0;

  while (flashCount<100) {
    flashCount = 0;
    steps++;
    for (let r=0;r<lines.length;r++) {
      for (let c = 0; c<lines[0].length;c++) {
        lines[r][c]++;
      }
    }

    for (let r=0;r<lines.length;r++) {
      for (let c = 0; c<lines[0].length;c++) {
        if (lines[r][c] > 9) {
          flash(r,c);
        }
      }
    }
  }
  
  console.log(steps);
  
}
