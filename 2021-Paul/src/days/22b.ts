
import fs  from "fs";
import { Superset } from "../utils";

export function Part1() {

  const input : number[][] = fs.readFileSync("./inputs/22.txt","utf8").trim().replace(/on/g,"1").replace(/off/g,"0").split("\n").map(i=>i.match(/-?\d+/g)!.map(j=>Number(j)));
  
  let outIndex = 0;
  while (input[outIndex][1]<=50 && input[outIndex][1]>=-50) {
    outIndex++;
  }

  let xs = [];
  let ys = [];
  let zs = [];

  for (let i = 0;i<outIndex;i++) {
    xs.push(input[i][1],input[i][2]+1);
    ys.push(input[i][3],input[i][4]+1);
    zs.push(input[i][5],input[i][6]+1);
  }

  let xsUnique = [...new Set(xs)].sort((a,b)=>a-b);
  let ysUnique = [...new Set(ys)].sort((a,b)=>a-b);
  let zsUnique = [...new Set(zs)].sort((a,b)=>a-b);

  console.log(xsUnique,ysUnique,zsUnique);

  let cubesOn = new Set<number>();

  for (let i=0;i<outIndex;i++) {
    if (input[i][0] == 1) {
      for (let x = xsUnique.indexOf(input[i][1]);x<xsUnique.indexOf(input[i][2]+1);x++) {
        for (let y = ysUnique.indexOf(input[i][3]);y<ysUnique.indexOf(input[i][4]+1);y++) {
          for (let z = zsUnique.indexOf(input[i][5]);z<zsUnique.indexOf(input[i][6]+1);z++) {
            cubesOn.add(x*1600+y*40+z);
          }
        }
      }
    } else {
      for (let x = xsUnique.indexOf(input[i][1]);x<xsUnique.indexOf(input[i][2]+1);x++) {
        for (let y = ysUnique.indexOf(input[i][3]);y<ysUnique.indexOf(input[i][4]+1);y++) {
          for (let z = zsUnique.indexOf(input[i][5]);z<zsUnique.indexOf(input[i][6]+1);z++) {
            cubesOn.delete(x*1600+y*40+z);
          }
        }
      }
    }
  }

  let totalVolume = 0;
  for (const item of cubesOn) {
    let xIndex = Math.floor(item / 1600);
    let yIndex = Math.floor((item % 1600)/40);
    let zIndex = item % 40;
    let volume = (xsUnique[xIndex+1]-xsUnique[xIndex]) * (ysUnique[yIndex+1]-ysUnique[yIndex]) * (zsUnique[zIndex+1]-zsUnique[zIndex]);
    totalVolume+=volume;
    //console.log(volume,totalVolume);
  }

  console.log(totalVolume);
}


export function Part2() {

  const input : number[][] = fs.readFileSync("./inputs/22.txt","utf8").trim().replace(/on/g,"1").replace(/off/g,"0").split("\n").map(i=>i.match(/-?\d+/g)!.map(j=>Number(j)));
  
  let outIndex = 0;
  while (input[outIndex][1]<=50 && input[outIndex][1]>=-50) {
    outIndex++;
  }

  let xs = [];
  let ys = [];
  let zs = [];

  for (let i = 0;i<outIndex;i++) {
    xs.push(input[i][1],input[i][2]+1);
    ys.push(input[i][3],input[i][4]+1);
    zs.push(input[i][5],input[i][6]+1);
  }

  let xsUnique = [...new Set(xs)].sort((a,b)=>a-b);
  let ysUnique = [...new Set(ys)].sort((a,b)=>a-b);
  let zsUnique = [...new Set(zs)].sort((a,b)=>a-b);

  console.log(xsUnique,ysUnique,zsUnique);

  let cubesOn = new Set<number>();

  for (let i=0;i<outIndex;i++) {
    if (input[i][0] == 1) {
      for (let x = xsUnique.indexOf(input[i][1]);x<xsUnique.indexOf(input[i][2]+1);x++) {
        for (let y = ysUnique.indexOf(input[i][3]);y<ysUnique.indexOf(input[i][4]+1);y++) {
          for (let z = zsUnique.indexOf(input[i][5]);z<zsUnique.indexOf(input[i][6]+1);z++) {
            cubesOn.add(x*1600+y*40+z);
          }
        }
      }
    } else {
      for (let x = xsUnique.indexOf(input[i][1]);x<xsUnique.indexOf(input[i][2]+1);x++) {
        for (let y = ysUnique.indexOf(input[i][3]);y<ysUnique.indexOf(input[i][4]+1);y++) {
          for (let z = zsUnique.indexOf(input[i][5]);z<zsUnique.indexOf(input[i][6]+1);z++) {
            cubesOn.delete(x*1600+y*40+z);
          }
        }
      }
    }
  }

  let totalVolume = 0;
  for (const item of cubesOn) {
    let xIndex = Math.floor(item / 1600);
    let yIndex = Math.floor((item % 1600)/40);
    let zIndex = item % 40;
    let volume = (xsUnique[xIndex+1]-xsUnique[xIndex]) * (ysUnique[yIndex+1]-ysUnique[yIndex]) * (zsUnique[zIndex+1]-zsUnique[zIndex]);
    totalVolume+=volume;
    //console.log(volume,totalVolume);
  }
  
  xs = [];
  ys = [];
  zs = [];

  for (let i = outIndex;i<input.length;i++) {
    xs.push(input[i][1],input[i][2]+1);
    ys.push(input[i][3],input[i][4]+1);
    zs.push(input[i][5],input[i][6]+1);
  }

  xsUnique = [...new Set(xs)].sort((a,b)=>a-b);
  ysUnique = [...new Set(ys)].sort((a,b)=>a-b);
  zsUnique = [...new Set(zs)].sort((a,b)=>a-b);

  console.log(xsUnique,ysUnique,zsUnique);

  cubesOn = new Superset<number>();

  for (let i=outIndex;i<input.length;i++) {
    if (input[i][0] == 1) {
      for (let x = xsUnique.indexOf(input[i][1]);x<xsUnique.indexOf(input[i][2]+1);x++) {
        for (let y = ysUnique.indexOf(input[i][3]);y<ysUnique.indexOf(input[i][4]+1);y++) {
          for (let z = zsUnique.indexOf(input[i][5]);z<zsUnique.indexOf(input[i][6]+1);z++) {
            cubesOn.add(x*640000+y*800+z);
          }
        }
      }
    } else {
      for (let x = xsUnique.indexOf(input[i][1]);x<xsUnique.indexOf(input[i][2]+1);x++) {
        for (let y = ysUnique.indexOf(input[i][3]);y<ysUnique.indexOf(input[i][4]+1);y++) {
          for (let z = zsUnique.indexOf(input[i][5]);z<zsUnique.indexOf(input[i][6]+1);z++) {
            cubesOn.delete(x*640000+y*800+z);
          }
        }
      }
    }
  }

  for (const item of cubesOn) {
    let xIndex = Math.floor(item / 640000);
    let yIndex = Math.floor((item % 640000)/800);
    let zIndex = item % 800;
    let volume = (xsUnique[xIndex+1]-xsUnique[xIndex]) * (ysUnique[yIndex+1]-ysUnique[yIndex]) * (zsUnique[zIndex+1]-zsUnique[zIndex]);
    totalVolume+=volume;
    //console.log(volume,totalVolume);
  }



  console.log(totalVolume);
}
