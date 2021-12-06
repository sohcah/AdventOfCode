
import fs  from "fs";

export function Part1() {

  const lines = fs.readFileSync("./inputs/3.txt","utf8").trim().split("\n").map(i=>i.split("").map(i=>Number(i.trim())));
  let gamma = 0;
  let epsilon = 0;
  let sums = new Array(lines[0].length).fill(0);
  for (let i = 0; i<lines.length; i++) {
    for (let j = 0; j<lines[i].length; j++) {
      sums[j]+=lines[i][j];
    }
  }
  let limit = lines.length / 2;
  for (let i = 0; i<sums.length; i++) {
    if (sums[i]>limit) {
      gamma=gamma*2+1;
      epsilon*=2;
    }
    else
    {
      gamma*=2;
      epsilon=epsilon*2+1;
    }
  }
  console.log(sums);
  console.log(gamma,epsilon,gamma*epsilon);
}

export function Part2() {

  const lines = fs.readFileSync("./inputs/3.txt","utf8").trim().split("\n").map(i=>i.split("").map(i=>Number(i.trim())));
  let oxygenLim;
  let CO2Lim;
  let oxygen = lines.slice();
  let CO2 = lines.slice();
  let sums;
  
  for (let i=0;i<lines[0].length; i++) {
    if (oxygen.length > 1) {
      oxygenLim = oxygen.length / 2;
      sums = new Array(lines[0].length).fill(0);
      for (let j = 0; j<oxygen.length; j++) {
        for (let k = 0; k<oxygen[j].length; k++) {
          sums[k]+=oxygen[j][k];
        }
      }
      if (Number(sums[i])>=oxygenLim) {
        oxygen = oxygen.filter(item => (item[i] == 1))
      }
      else {
        oxygen = oxygen.filter(item => (item[i] == 0))
      }
    }

    if (CO2.length>1) {
      CO2Lim = CO2.length / 2;
      sums = new Array(lines[0].length).fill(0);
      for (let j = 0; j<CO2.length; j++) {
        for (let k = 0; k<CO2[j].length; k++) {
          sums[k]+=CO2[j][k];
        }
      }
      if (Number(sums[i])<CO2Lim) {
        CO2 = CO2.filter(item => (item[i] == 1))
      }
      else {
        CO2 = CO2.filter(item => (item[i] == 0))
      }
    }

    
  }
  let oxygenRating = parseInt(oxygen[0].join(""),2);
  let CO2Rating = parseInt(CO2[0].join(""),2);
  console.log(oxygenRating,CO2Rating,oxygenRating*CO2Rating);
}

