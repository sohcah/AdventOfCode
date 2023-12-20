import { loadTrimmed, output } from "aocutils";

let input = loadTrimmed().split("\n").map(i=>i.split(""));

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

for (let i=0;i<input.length;i++) {
  if (!input[i].includes("#")) {
    input.splice(i,0,input[i].slice());
    i++;
  }
}


input = input[0].map((_, colIndex) => input.map(row => row[colIndex]));

//console.log(input.length);

for (let i=0;i<input.length;i++) {
  if (!input[i].includes("#")) {
    input.splice(i,0,input[i].slice());
    i++;
  }
}

galaxies = [];

for (let i=0;i<input.length;i++) {
  let j= 0;
  while (input[i].slice(j).includes("#")) {
    j+= input[i].slice(j).indexOf("#");
    galaxies.push([i,j]);
    j++;
  }
}

let sum2 = 0;

for (let i = 0;i<galaxies.length-1;i++){
  for (let j = i+1;j<galaxies.length;j++){
    sum2+=galaxies[j][0]-galaxies[i][0]+Math.abs(galaxies[j][1]-galaxies[i][1]);
  }
}
console.log(sum,sum2-sum);

output((sum2-sum)*999999+sum).forTest(374).forActual(648458253817);
