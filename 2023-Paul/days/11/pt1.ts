import { loadTrimmed, output } from "aocutils";

let input = loadTrimmed().split("\n").map(i=>i.split(""));

for (let i=0;i<input.length;i++) {
  if (!input[i].includes("#")) {
    input.splice(i,0,input[i].slice());
    i++;
  }
}


input = input[0].map((_, colIndex) => input.map(row => row[colIndex]));


for (let i=0;i<input.length;i++) {
  if (!input[i].includes("#")) {
    input.splice(i,0,input[i].slice());
    i++;
  }
}

let galaxies = [];

for (let i=0;i<input.length;i++) {
  let j= 0;
  while (input[i].slice(j).includes("#")) {
    j+= input[i].slice(j).indexOf("#");
    galaxies.push([i,j]);
    j++;
  }
}

let sum = 0;

for (let i = 0;i<galaxies.length-1;i++){
  for (let j = i+1;j<galaxies.length;j++){
    sum+=galaxies[j][0]-galaxies[i][0]+Math.abs(galaxies[j][1]-galaxies[i][1]);
  }
}

output(sum).forTest(374).forActual(9550717);
