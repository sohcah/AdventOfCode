import { loadTrimmed, output} from "aocutils";

const input = loadTrimmed()
  .split("\n").map(i=>[i.slice(i.indexOf(":")+2,i.indexOf("|")),i.slice(i.indexOf("|")+2)+" "]);

let noOfCard = new Array(input.length).fill(1);



let cardNo = 0;
for (const card of input) {
  let winCount = 0;
  for (let i=0;i<card[0].length;i+=3) {
    if (card[1].includes(card[0].slice(i,i+3))) {
      winCount++;
    }
  }
  for (let j = 0;j<winCount;j++){
    noOfCard[cardNo+j+1]+=noOfCard[cardNo];
  }
  cardNo++;
}

output(noOfCard.reduce((partialSum, a) => partialSum + a, 0)).forTest(30);
