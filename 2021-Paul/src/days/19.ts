import fs from "fs";

let input0;
let inputRef;
let remaining = new Set<number>();
let pos;

function compare(s1: number[][],s2: number[][],index: number) {
  let s2mod = [];
  loop:
  for (let i=0;i<s1.length;i++) {
    for (let j=0;j<s2.length;j++) {
      s2mod = s2.map(([x,y,z])=>[x-(s2[j][0]-s1[i][0]),y-(s2[j][1]-s1[i][1]),z-(s2[j][2]-s1[i][2])]);
      //console.log(s2mod.slice(0,3));
      let count = 0;
      for (let k=0;k<s1.length;k++) {
        for (let l=0;l<s2mod.length;l++) {
          if (s1[k][0] == s2mod[l][0] && s1[k][1] == s2mod[l][1] && s1[k][2] == s2mod[l][2]) {
            count++;
          
          }
        }
      }
      if (count>11) {
        pos.push([s1[i][0]-s2[j][0],s1[i][1]-s2[j][1],s1[i][2]-s2[j][2]]);
        input0.push(s2mod);
        inputRef.push(index);
        remaining.delete(index);
        break loop;
      };
    }
  }
  return [];
}

export function Part1() {
  let input = fs
    .readFileSync("./inputs/19.txt", "utf8")
    .trim()
    .replace(/--- scanner \d+ ---\n/g, "")
    .split("\n\n").map(i=>i.split("\n").map(j=>j.split(",").map(k=>Number(k))));

  let scan1 = [];
  let scan2 = [];
  pos = [[0,0,0]];
  input0 = [input[0]];
  inputRef = [0];
  for (let i = 1;i<input.length;i++) {
    remaining.add(i);
  }
  
  for (let i = 0;i<input0.length;i++) {
    for (const j of remaining) {
  
  
      scan1 = input0[i];

      scan2 = input[j];
      compare(scan1,scan2,j);
      scan2 = input[j].map(([x,y,z])=>[x,-z,y]);
      compare(scan1,scan2,j);
      scan2 = input[j].map(([x,y,z])=>[x,-y,-z]);
      compare(scan1,scan2,j);
      scan2 = input[j].map(([x,y,z])=>[x,z,-y]);
      compare(scan1,scan2,j);
      
      scan2 = input[j].map(([x,y,z])=>[-x,y,-z]);
      compare(scan1,scan2,j);
      scan2 = input[j].map(([x,y,z])=>[-x,z,y]);
      compare(scan1,scan2,j);
      scan2 = input[j].map(([x,y,z])=>[-x,-y,z]);
      compare(scan1,scan2,j);
      scan2 = input[j].map(([x,y,z])=>[-x,-z,-y]);
      compare(scan1,scan2,j);
      
      scan2 = input[j].map(([x,y,z])=>[-z,y,x]);
      compare(scan1,scan2,j);
      scan2 = input[j].map(([x,y,z])=>[-y,-z,x]);
      compare(scan1,scan2,j);
      scan2 = input[j].map(([x,y,z])=>[z,-y,x]);
      compare(scan1,scan2,j);
      scan2 = input[j].map(([x,y,z])=>[y,z,x]);
      compare(scan1,scan2,j);
      
      scan2 = input[j].map(([x,y,z])=>[z,y,-x]);
      compare(scan1,scan2,j);
      scan2 = input[j].map(([x,y,z])=>[-y,z,-x]);
      compare(scan1,scan2,j);
      scan2 = input[j].map(([x,y,z])=>[-z,-y,-x]);
      compare(scan1,scan2,j);
      scan2 = input[j].map(([x,y,z])=>[y,-z,-x]);
      compare(scan1,scan2,j);
      
      scan2 = input[j].map(([x,y,z])=>[-y,x,z]);
      compare(scan1,scan2,j);
      scan2 = input[j].map(([x,y,z])=>[-z,x,-y]);
      compare(scan1,scan2,j);
      scan2 = input[j].map(([x,y,z])=>[y,x,-z]);
      compare(scan1,scan2,j);
      scan2 = input[j].map(([x,y,z])=>[z,x,y]);
      compare(scan1,scan2,j);
      
      scan2 = input[j].map(([x,y,z])=>[y,-x,z]);
      compare(scan1,scan2,j);
      scan2 = input[j].map(([x,y,z])=>[-z,-x,y]);
      compare(scan1,scan2,j);
      scan2 = input[j].map(([x,y,z])=>[-y,-x,-z]);
      compare(scan1,scan2,j);
      scan2 = input[j].map(([x,y,z])=>[z,-x,-y]);
      compare(scan1,scan2,j);
  
    }
  }
  let overlap = new Set();
  for (let i = 0;i<input0.length;i++) {
    for (let j = 0;j<input0[i].length;j++) {
      overlap.add(input0[i][j].join(","));
    }
  }
  
  let maxManhattan = 0;
  for (let i=0;i<pos.length-1;i++) {
    for (let j = i+1;j<pos.length;j++) {
      let Manhattan = Math.abs(pos[i][0]-pos[j][0]) + Math.abs(pos[i][1]-pos[j][1]) + Math.abs(pos[i][2]-pos[j][2]);
      if (Manhattan>maxManhattan) {maxManhattan = Manhattan};
    }
  }

  console.log("Total number of beacons = ",overlap.size);
  console.log();
  console.log("Largest Manhattan distance between scanners = ",maxManhattan);
}

