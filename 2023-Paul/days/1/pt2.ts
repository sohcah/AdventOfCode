import { loadTrimmed, output, sum } from "aocutils";

const input = loadTrimmed();
const lines = input.split("\n");

console.log(lines);

let lookFor = [["0","zero"],["1","one"],["2","two"],["3","three"],["4","four"],["5","five"],["6","six"],["7","seven"],["8","eight"],["9","nine"]]

let sum = 0;
for (const line of lines) {
  console.log(line);
  Loop: for (let i=0;i<line.length;i++) {
    for (const pair of lookFor) {
      for (const num of pair) {
        if (line.slice(i,i+num.length) == num) {
          sum += Number(pair[0])*10;
          console.log(sum);
          break Loop;
        }
      }
    }
  }
  Loop: for (let i=line.length-1;i>=0;i--) {
    for (const pair of lookFor) {
      for (const num of pair) {
        if (line.slice(i,i+num.length) == num) {
          sum += Number(pair[0]);
          console.log(sum);
          break Loop;
        }
      }
    }
  }

}

output(sum).forTest(281);
