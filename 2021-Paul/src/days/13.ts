
import fs  from "fs";

export function Part1() {

  const lines = fs.readFileSync("./inputs/13.txt","utf8").trim().replace(/fold along /g,"").split("\n\n").map(i=>i.split("\n"));
  let coords = lines[0].map(i=>i.split(",").map(j=>Number(j)));
  let j = 0;

  for (let i = 0;i<1;i++) {
    if (lines[1][i][0] == "x") {j = 0} else {j=1};
    let n = Number(lines[1][i].slice(2));
    for (let k = 0;k<coords.length;k++) {
      if (coords[k][j]>n) {coords[k][j] = 2*n - coords[k][j]};
    }
  }
  
  let coordsSet = new Set();

  for (let i = 0;i<coords.length;i++) {
    coordsSet.add(coords[i][0]*1000+coords[i][1]);
  }
  console.log(coordsSet.size);
}

export function Part2() {

  const lines = fs.readFileSync("./inputs/13.txt","utf8").trim().replace(/fold along /g,"").split("\n\n").map(i=>i.split("\n"));
  let coords = lines[0].map(i=>i.split(",").map(j=>Number(j)));
  let j = 0;
  let xMax = 2000;
  let yMax = 2000;

  for (let i = 0;i<lines[1].length;i++) {
    if (lines[1][i][0] == "x") {
      j = 0;
      xMax = Number(lines[1][i].slice(2));
    } else {
      j=1;
      yMax = Number(lines[1][i].slice(2));
    }
    let n = Number(lines[1][i].slice(2));
    for (let k = 0;k<coords.length;k++) {
      if (coords[k][j]>n) {coords[k][j] = 2*n - coords[k][j]};
    }
  }
  
  let coordsSet = new Set();

  for (let i = 0;i<coords.length;i++) {
    coordsSet.add(coords[i][0]*1000+coords[i][1]);
  }
  let grid = [""];
  for (let i = 0;i<yMax;i++) {
    for (let j = 0;j<xMax;j++) {
      if (coordsSet.has(j*1000+i)){grid[i] = grid[i] + "#"} else {grid[i] = grid[i] + "."};
    }
    console.log(grid[i]);
    grid.push("");
  }

}

