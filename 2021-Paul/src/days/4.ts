
import fs  from "fs";

export function Part1() {

  const lines = fs.readFileSync("./inputs/4.txt","utf8").trim().split("\n\n").map(i=>i.match(/\d+/g)!.map(j => Number(j)));
  let noOfCards = lines.length-1;
  let Rows = new Array(noOfCards*5).fill(0);
  let Columns = new Array(noOfCards*5).fill(0);
  let pos;
  let win = false;
  let winCard = 0;
  let winCall = 0;

  let i = 0;
  while (win == false && i<lines[0]!.length) {
    for (let j = 0; j<noOfCards; j++) {
      pos = lines[j+1]!.indexOf(lines[0]![i]);
      if (pos != -1) {
        Rows[j*5+Math.floor(pos/5)]++;
        Columns[j*5+pos%5]++;
      
        if ((Rows[j*5+Math.floor(pos/5)]==5) || (Columns[j*5+pos%5]==5)) {
          win = true;
          winCard = j;
          winCall = lines[0]![i];
          console.log(winCard,winCall);
        }
      }
    }
    i++;
  }
  let score = lines[winCard+1]!.reduce((a,b)=>a+b,0);
  for (let j=0;j<i;j++) {
    if (lines[winCard+1].includes(lines[0][j])) {
      score-=lines[0][j];
    }
  }
  console.log(winCard,winCall,score,winCall*score);
}

export function Part2() {

  const lines = fs.readFileSync("./inputs/4.txt","utf8").trim().split("\n\n").map(i=>i.match(/\d+/g)!.map(j => Number(j)));
  let noOfCards = lines.length-1;
  let Rows = new Array(noOfCards*5).fill(0);
  let Columns = new Array(noOfCards*5).fill(0);
  let pos;
  let winCard = 0;
  let winCall = 0;
  let winCallIndex=0;
  let cardWin = new Array(noOfCards).fill(0);
  let cardsWon = 0;

  let i = 0;
  while (cardsWon<noOfCards) {
    for (let j = 0; j<noOfCards; j++) {
      pos = lines[j+1]!.indexOf(lines[0]![i]);
      if (pos != -1) {
        Rows[j*5+Math.floor(pos/5)]++;
        Columns[j*5+pos%5]++;
      
        if ((Rows[j*5+Math.floor(pos/5)]==5) || (Columns[j*5+pos%5]==5)) {
          
          if (cardWin[j] == 0) {
            cardsWon++;
            winCard = j;
            winCall = lines[0]![i];
            winCallIndex = i;
            //console.log(winCard,winCall);
          }
          cardWin[j] = 1;
        }
      }
    }
    i++;
  }
  let score = lines[winCard+1]!.reduce((a,b)=>a+b,0);
  for (let j=0;j<=winCallIndex;j++) {
    if (lines[winCard+1].includes(lines[0][j])) {
      score-=lines[0][j];
    }
    
  }
  console.log(winCard,winCall,score,winCall*score);
}



