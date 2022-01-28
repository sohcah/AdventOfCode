
import fs  from "fs";

let spaces: number[][];
let cost = [0];
let costMultiplier: number[][];
let lastMove = [[5,0,0]];
let minCost = Infinity;

// function delay(ms : number) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

// async function pause(n: number) {
//   await delay(n);
// }

function validMove(d : number,h : number,s : number) {
  
  if (spaces[0][s] > 0 && spaces[d+1][h] > 0 || spaces[0][s] == 0 && spaces[d+1][h] == 0) {return false}; //must be moving SOMETHING into a blank
  
  if (d > 0 && spaces[d][h] != 0) {return false}; //space above hole landing must be blank!
  
  if (d<3 && spaces[d+2][h] == 0) {return false}; //can't be in hole above a blank! 
  
  if (d == 3 && spaces[4][h] == h+1) {return false}; //can't move bottom one out of its home!
  if (d == 2 && spaces[3][h] == h+1 && spaces[4][h] == h+1) {return false}; //cant move second from bottom out of its home if..
  if (d == 1 && spaces[2][h] == h+1 && spaces[3][h] == h+1 && spaces[4][h] == h+1) {return false}; //cant move third from bottom out of its home if..
  if (d == 0 && spaces[1][h] == h+1 && spaces[2][h] == h+1 && spaces[3][h] == h+1 && spaces[4][h] == h+1) {return false}; //cant move fourth from bottom out of its home if..
  
  if (spaces [0][s] > 0 && spaces[0][s] != h+1) {return false}; // can;t move into the wrong hole!
  
  if (spaces [0][s] > 0 && d == 0 && (spaces[2][h] != h+1 || spaces[3][h] != h+1 || spaces[4][h] != h+1)) {return false}; // can't move in on top of three with any in wrong hole!
  if (spaces [0][s] > 0 && d == 1 && (spaces[3][h] != h+1 || spaces[4][h] != h+1)) {return false}; // can't move in on top of two with any in wrong hole!
  if (spaces [0][s] > 0 && d == 2 && spaces[4][h] != h+1) {return false}; // can't move in on top of one in wrong hole!
  
  if (lastMove[0][0] == d && lastMove[0][1] == h && lastMove[0][2] == s) {return false}; //can't repeat last move!
  if (h>=s) {
    for (let i=s+1;i<=h+1;i++) {
      if (spaces[0][i]>0) {return false}
    }
  } else {
    for (let i = h+2;i<=s-1;i++) {
      if (spaces[0][i]>0) {return false}
    }
  }
  return true;
}

function move() {
  // console.log(spaces[0], cost);
  // console.log(spaces[1]);
  // console.log(spaces[2]);
  // console.log(spaces[3]);
  // console.log(spaces[4]);
  // pause(2000);
  if (cost.length>40) {throw 'Oh no!'}
  
  if (spaces[1][0] == 1 && spaces[1][1] == 2 && spaces[1][2] == 3 && spaces[1][3] == 4 && spaces[4][0] == 1 && spaces[4][1] == 2 && spaces[4][2] == 3 && spaces[4][3] == 4) {
    if (cost[0]<minCost) {
      console.log(cost[0]);
      minCost = cost[0];
    }
  } else {
    for (let depth = 0;depth<4;depth++) {
      for (let hole = 0;hole<4;hole++) {
        for (let space = 0;space<7;space++) {
          if (validMove(depth,hole,space)) {
            cost.unshift(cost[0]+(costMultiplier[hole][space]+depth)*Math.pow(10,spaces[0][space]+spaces[depth+1][hole]-1));
            if (cost[0]<minCost) {
              let temp = spaces[0][space];
              spaces[0][space] = spaces[depth+1][hole];
              spaces[depth+1][hole] = temp;
              lastMove.unshift([depth,hole,space]);
              move();
              temp = spaces[0][space];
              spaces[0][space] = spaces[depth+1][hole];
              spaces[depth+1][hole] = temp;
              lastMove.shift();
            }
            cost.shift();

            // console.log();
            // console.log(spaces[0], cost);
            // console.log(spaces[1]);
            // console.log(spaces[2]);
            // console.log(spaces[3]);
            // console.log(spaces[4]);
          }

        }
      }
    }
  }
}

export function Part1() {

  const input = fs.readFileSync("./inputs/23.txt","utf8").trim().split("\n");

  spaces = [[0,0,0,0,0,0,0]];
  spaces.push([]);
  for (let i=3;i<=9;i+=2) {
    spaces[1].push(input[2].charCodeAt(i)-64);
  }
  spaces.push([]);
  for (let i=3;i<=9;i+=2) {
    spaces[2].push(input[3].charCodeAt(i)-64);
  }
  spaces.push([1,2,3,4]);
  spaces.push([1,2,3,4]);

  costMultiplier = [[3,2,2,4,6,8,9],[5,4,2,2,4,6,7],[7,6,4,2,2,4,5],[9,8,6,4,2,2,3]];

  move();

  console.table(spaces);
  console.log();
 
}

export function Part2() {

  const input = fs.readFileSync("./inputs/23.txt","utf8").trim().split("\n");

  spaces = [[0,0,0,0,0,0,0]];
  spaces.push([]);
  for (let i=3;i<=9;i+=2) {
    spaces[1].push(input[2].charCodeAt(i)-64);
  }
  spaces.push([4,3,2,1]);
  spaces.push([4,2,1,3]);
  spaces.push([]);
  for (let i=3;i<=9;i+=2) {
    spaces[4].push(input[3].charCodeAt(i)-64);
  }

  costMultiplier = [[3,2,2,4,6,8,9],[5,4,2,2,4,6,7],[7,6,4,2,2,4,5],[9,8,6,4,2,2,3]];

  move();

  console.table(spaces);
  console.log();
 
}
