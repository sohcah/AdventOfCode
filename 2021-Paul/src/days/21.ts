
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

  let frequencyPositions = [[0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0]];
  frequencyPositions[0][positions[0]] = 1;
  frequencyPositions[1][positions[1]] = 1;

  let frequencyScores = [new Array(31).fill(0),new Array(31).fill(0)];
  frequencyScores[0][0] = 1;
  frequencyScores[1][0] = 1;
  let turns = 0;

  for (let i = 0;i<4;i++) {

    //Update positions
    let frequencyPositionsNew = [[0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0]];
    for (let total = 3;total<10;total++) {
      for (let pos = 1;pos<11;pos++) {
        frequencyPositionsNew[turns%2][(pos+total-1) % 10 +1] += frequencyPositions[turns%2][pos] * frequencyDiceTotals[total];
      }
    }
    frequencyPositionsNew[(turns+1) % 2] = frequencyPositions[(turns+1) % 2].map(i=>i*27);

    //Update scores
    let frequencyScoresNew = [new Array(31).fill(0),new Array(31).fill(0)];
    for (let score = 0;score<21;score++) {
      for (let pos = 1;pos<11;pos++) {
        frequencyScoresNew[turns%2][score+pos] += frequencyScores[turns%2][score] * frequencyPositionsNew[turns%2][pos] / (27 ** turns);
      }
    }
    frequencyScoresNew[(turns+1) % 2] = frequencyScores[(turns+1) % 2].map(i=>i*27);

    turns++;

    console.log(frequencyPositionsNew,frequencyScoresNew, frequencyScoresNew.map(i => i.reduce((a,b) => a + b)));

    frequencyPositions = [frequencyPositionsNew[0].slice(),frequencyPositionsNew[1].slice()];
    frequencyScores = [frequencyScoresNew[0].slice(),frequencyScoresNew[1].slice()];
    
  }
}
