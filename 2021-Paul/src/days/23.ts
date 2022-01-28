
import fs  from "fs";

let spaces: number[][];
let cost = [0];
let costMultiplier: number[][];
let lastMove = [3,0,0];
let minCost = Infinity;

function validMove(d : number,h : number,s : number) {
  if (spaces[0][s] > 0 && spaces[d+1][h] > 0 || spaces[0][s] == 0 && spaces[d+1][h] == 0) {return false};
  if (d == 1 && spaces[1][h] != 0) {return false};
  if (d == 1 && spaces[2][h] == h+1) {return false};
  if (d == 0 && spaces[1][h] == h+1 && spaces[2][h] == h+1) {return false};
  if (spaces [0][s] > 0 && spaces[0][s] != h+1) {return false};
  if (spaces [0][s] > 0 && d == 0 && spaces[2][h] != h+1) {return false};
  if (JSON.stringify(lastMove) == JSON.stringify([d,h,s])) {return false};
  if (d == 1 && spaces[1][h] != 0) {return false};
  if (h<=s) {
    for (let i=h+1;i<s;i++) {
      if (spaces[0][i]>0) {return false}
    }
  } else {
    for (let i = s+1;i<=h;i++) {
      if (spaces[0][i]>0) {return false}
    }
  }
  return true;
}

function move() {
  // console.log(spaces[0], cost);
  // console.log(spaces[1]);
  // console.log(spaces[2]);
  if (JSON.stringify(spaces[1]) == JSON.stringify([1,2,3,4]) && JSON.stringify(spaces[2]) == JSON.stringify([1,2,3,4])) {
    if (cost[0]<minCost) {
      minCost = cost[0];
    }
  } else {
    for (let depth = 0;depth<2;depth++) {
      for (let hole = 0;hole<4;hole++) {
        for (let space = 0;space<5;space++) {
          if (validMove(depth,hole,space)) {
            cost.unshift(cost[0]+(costMultiplier[hole][space]+depth)*Math.pow(10,spaces[0][space]+spaces[depth+1][hole]-1));
            if (cost[0]<minCost) {
              let temp = spaces[0][space];
              spaces[0][space] = spaces[depth+1][hole];
              spaces[depth+1][hole] = temp;
              lastMove = [depth,hole,space];
              move();
              temp = spaces[0][space];
              spaces[0][space] = spaces[depth+1][hole];
              spaces[depth+1][hole] = temp;
            }
            cost.shift();

            // console.log();
            // console.log(spaces[0], cost);
            // console.log(spaces[1]);
            // console.log(spaces[2]);
          }

        }
      }
    }
  }
}

export function Part1() {

  const input = fs.readFileSync("./inputs/23.txt","utf8").trim().split("\n");

  spaces = [[0,0,0,0,0]];
  spaces.push([]);
  for (let i=3;i<=9;i+=2) {
    spaces[1].push(input[2].charCodeAt(i)-64);
  }
  spaces.push([]);
  for (let i=3;i<=9;i+=2) {
    spaces[2].push(input[3].charCodeAt(i)-64);
  }

  costMultiplier = [[2,2,4,6,8],[4,2,2,4,6],[6,4,2,2,4],[8,6,4,2,2]];

  move();

  console.log(minCost);  
 
}
