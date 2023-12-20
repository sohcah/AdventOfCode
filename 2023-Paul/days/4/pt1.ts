import { loadTrimmed, output} from "aocutils";

const input = loadTrimmed()
  .split("\n").map(i=>[i.slice(i.indexOf(":")+2,i.indexOf("|")),i.slice(i.indexOf("|")+2)+" "]);

console.log(input[0])

let sum = 0;
let sum1 = 0;
let sum2 = 0;
for (const card of input) {
  let winCount = 0;
  let binary1 = "";
  let binary2 = "0".repeat((card[1].length)/3);
  for (let i=0;i<card[0].length;i+=3) {
    if (card[1].includes(card[0].slice(i,i+3))) {
      winCount++;
      binary1 += "1";
      let pos = card[1].indexOf(card[0].slice(i,i+3))/3;
      binary2 = binary2.slice(0,pos) + "1" +binary2.slice(pos+1);
    } else {
      binary1 += "0";
    }
  }
  if (winCount>0) {
    sum+=Math.pow(2,winCount-1);
  }
  sum1 += parseInt(binary1,2);
  sum2 += parseInt(binary2,2);

  console.log(sum,binary1,parseInt(binary1,2),binary2,parseInt(binary2,2));
}

//.split("").reverse().join("");
console.log(sum,sum1,sum2);
output(sum).forTest(13);
