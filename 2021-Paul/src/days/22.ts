
import fs  from "fs";

export function Part1() {

  const input : number[][] = fs.readFileSync("./inputs/22.txt","utf8").trim().replace(/on/g,"1").replace(/off/g,"0").split("\n").map(i=>i.match(/-?\d+/g)!.map(j=>Number(j)));
  
  

  let cubesOn = new Set();

  for (let i=0;i<input.length;i++) {
    console.log(i);
    if (input[i][0] == 1) {
      for (let x = Math.max(-50,input[i][1]);x<=Math.min(50,input[i][2]);x++) {
        for (let y = Math.max(-50,input[i][3]);y<=Math.min(50,input[i][4]);y++) {
          for (let z = Math.max(-50,input[i][5]);z<=Math.min(50,input[i][6]);z++) {
            cubesOn.add((x+50)*10201+(y+50)*101+z+50);
          }
        }
      }
    } else {
      for (let x = Math.max(-50,input[i][1]);x<=Math.min(50,input[i][2]);x++) {
        for (let y = Math.max(-50,input[i][3]);y<=Math.min(50,input[i][4]);y++) {
          for (let z = Math.max(-50,input[i][5]);z<=Math.min(50,input[i][6]);z++) {
            cubesOn.delete((x+50)*10201+(y+50)*101+z+50);
          }
        }
      }
    }
  }

  console.log(cubesOn.size);
}

export function Part2() {

  const input : number[][] = fs.readFileSync("./inputs/22.txt","utf8").trim().replace(/on/g,"1").replace(/off/g,"0").split("\n").map(i=>i.match(/-?\d+/g)!.map(j=>Number(j)));
  
  let outIndex = 0;
  while (input[outIndex][1]<=50 && input[outIndex][1]>=-50) {
    outIndex++
  }

  let current = input.slice(0,outIndex);
  let next = [];
  for (let i=0;i<outIndex-1;i++) {
    for (let j=i+1;j<outIndex;j++) {
      let xMin = Math.max(current[i][1],current[j][1]);
      let xMax = Math.min(current[i][2],current[j][2]);
      let yMin = Math.max(current[i][3],current[j][3]);
      let yMax = Math.min(current[i][4],current[j][4]);
      let zMin = Math.max(current[i][5],current[j][5]);
      let zMax = Math.min(current[i][6],current[j][6]);

      if (xMin<=xMax && yMin<=yMax && zMin <=zMax) {
        
      }
    }
  }

  console.log(current);

}  