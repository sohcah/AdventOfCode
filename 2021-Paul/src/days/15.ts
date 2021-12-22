
import fs  from "fs";

export function Part1() {

  const input = fs.readFileSync("./inputs/15.txt","utf8").trim().split("\n");
  
  let grid = input.map(i => i.split("").map(i => Number(i)));
  let workgrid = input.map(i => i.split("").map(i => Number(i)));
  const width = workgrid[0].length;
  const height = workgrid.length;
  
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (i != 0 && j != 0) {
        workgrid[i][j] += Math.min(workgrid[i - 1][j], workgrid[i][j - 1]);
      } else {
        if (i == 0 && j != 0) {
          workgrid[i][j] += workgrid[i][j - 1];
        }
        if (j == 0 && i != 0) {
          workgrid[i][j] += workgrid[i - 1][j];
        }
      }
    }
  }
  
  let changed = true;
  
  while (changed == true) {
    changed = false;
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        if (i != 0) {
          if (workgrid[i][j]>workgrid[i-1][j]+grid[i][j]) {
            workgrid[i][j] = workgrid[i-1][j]+grid[i][j];
            changed = true;
          }
        }
        if (i != height-1) {
          if (workgrid[i][j]>workgrid[i+1][j]+grid[i][j]) {
            workgrid[i][j] = workgrid[i+1][j]+grid[i][j];
            changed = true;
          }
        }
        if (j != 0) {
          if (workgrid[i][j]>workgrid[i][j-1]+grid[i][j]) {
            workgrid[i][j] = workgrid[i][j-1]+grid[i][j];
            changed = true;
          }
        }
        if (j != width-1) {
          if (workgrid[i][j]>workgrid[i][j+1]+grid[i][j]) {
            workgrid[i][j] = workgrid[i][j+1]+grid[i][j];
            changed = true;
          }
        } 
      }
    }
  }
  
  let output = workgrid[height - 1][width - 1] - grid[0][0];
  
  
  console.log(output);

}

export function Part2() {

  const input = fs.readFileSync("./inputs/15.txt","utf8").trim().split("\n");
  
  let grid = input.map(i => i.split("").map(i => Number(i)));
  let workgrid = input.map(i => i.split("").map(i => Number(i)));
  let width = workgrid[0].length;
  let height = workgrid.length;

  for(let loop = 1;loop<5;loop++) {
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        let n = grid[i][j]+loop;
        if (n>9) {n-=9};
        grid[i].push(n);
        workgrid[i].push(n);
      }
    }
  
  }
  width = workgrid[0].length;

  for(let loop = 1;loop<5;loop++) {
    for (let i = 0; i < height; i++) {
      grid.push([]);
      workgrid.push([]);
      for (let j = 0; j < width; j++) {
        let n = grid[i][j]+loop;
        if (n>9) {n-=9};
        grid[loop*height+i].push(n);
        workgrid[loop*height+i].push(n);
      }
    }
  }
  
  height = workgrid.length;

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (i != 0 && j != 0) {
        workgrid[i][j] += Math.min(workgrid[i - 1][j], workgrid[i][j - 1]);
      } else {
        if (i == 0 && j != 0) {
          workgrid[i][j] += workgrid[i][j - 1];
        }
        if (j == 0 && i != 0) {
          workgrid[i][j] += workgrid[i - 1][j];
        }
      }
    }
  }
  
  let changed = true;
  
  while (changed == true) {
    changed = false;
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        if (i != 0) {
          if (workgrid[i][j]>workgrid[i-1][j]+grid[i][j]) {
            workgrid[i][j] = workgrid[i-1][j]+grid[i][j];
            changed = true;
          }
        }
        if (i != height-1) {
          if (workgrid[i][j]>workgrid[i+1][j]+grid[i][j]) {
            workgrid[i][j] = workgrid[i+1][j]+grid[i][j];
            changed = true;
          }
        }
        if (j != 0) {
          if (workgrid[i][j]>workgrid[i][j-1]+grid[i][j]) {
            workgrid[i][j] = workgrid[i][j-1]+grid[i][j];
            changed = true;
          }
        }
        if (j != width-1) {
          if (workgrid[i][j]>workgrid[i][j+1]+grid[i][j]) {
            workgrid[i][j] = workgrid[i][j+1]+grid[i][j];
            changed = true;
          }
        } 
      }
    }
  }
  
  let output = workgrid[height - 1][width - 1] - grid[0][0];
  
  
  console.log(output);

}