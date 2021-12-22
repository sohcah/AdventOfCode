
import fs  from "fs";

export function Part1() {

  const positions = fs.readFileSync("./inputs/21.txt","utf8").trim().split("\n").map(i=>Number(i.slice(28)));
  
  let scores = [0,0];
  let diceScore = 6;
  let rolls = 0;
  while (scores[(rolls+1) % 2] < 1000) {
    positions[rolls % 2] = (positions[rolls % 2] + diceScore - 1) % 10 +1;
    scores[rolls % 2] +=positions[rolls % 2];
    rolls++;
    diceScore--;
    if (diceScore == -1) {diceScore = 9};
  }

  console.log(rolls*3*scores[rolls % 2]);
}

export function Part2() {

  const positions = fs.readFileSync("./inputs/21.txt","utf8").trim().split("\n").map(i=>Number(i.slice(28)));
  
  let frequencyDiceTotals = [0,0,0,1,3,6,7,6,3,1];
  let wins = [0,0];
  let universesSoFar = 1;
  let frequencyPosScore: number[][][][] = JSON.parse(JSON.stringify(new Array(22).fill(new Array(2).fill(new Array(11).fill(new Array(21).fill(0))))));
  //[generation][player0-1][position(0)1-10][score0-20]
 
  frequencyPosScore[0][0][positions[0]][0] = 1;
  frequencyPosScore[0][1][positions[1]][0] = 1;

  for (let turn = 0;turn<20;turn++) {
    
    let winsThisTurn = 0;
    for (let total = 3;total<10;total++) {
      for (let pos = 1;pos<11;pos++) {
        for (let score = 0;score<21;score++) {
          let posNew = (pos+total-1) % 10 + 1;
          let newScore = score + posNew;
          if (newScore>20) {
            winsThisTurn+= frequencyPosScore[turn][turn%2][pos][score] * frequencyDiceTotals[total];
          } else {
            frequencyPosScore[turn+1][turn%2][posNew][newScore] += frequencyPosScore[turn][turn%2][pos][score] * frequencyDiceTotals[total];
          }
        }
      }
    }
    universesSoFar *=27;
    wins[turn%2]+=winsThisTurn;
    frequencyPosScore[turn+1][(turn+1)%2] = frequencyPosScore[turn][(turn+1)%2].map(i=>i.map(j=>j*(27*(universesSoFar-winsThisTurn)/universesSoFar)));
    universesSoFar-=winsThisTurn;

    // console.table(frequencyPosScore[turn + 1][0]);
    // console.log(frequencyPosScore[turn + 1][0].reduce((a,b)=> a.concat(b)).reduce((a,b)=>a+b));
    // console.table(frequencyPosScore[turn + 1][1]);
    // console.log(frequencyPosScore[turn + 1][1].reduce((a,b)=> a.concat(b)).reduce((a,b)=>a+b));
    // console.log(winsThisTurn,wins);
  }

  console.log(Math.max(...wins));
}
