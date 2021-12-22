import fs from "fs";

function enhance(loopLength: number) {

  const input = fs
    .readFileSync("./inputs/20.txt", "utf8")
    .trim()
    .replace(/\#/g, "1")
    .replace(/\./g, "0")
    .split("\n\n").map(i=>i.split("\n"));

  let enhancement = input[0][0];
  let verticalPad = 55;
  let horizontalPad = 55;
  let image = [];

  for (let i=0;i<verticalPad;i++) {
    image.push("0".repeat(horizontalPad*2+input[1][0].length));
  }
  for (let i=0;i<input[1][0].length;i++) {
    image.push("0".repeat(horizontalPad)+input[1][i]+"0".repeat(horizontalPad));
    
  }
  for (let i=0;i<verticalPad;i++) {
    image.push("0".repeat(horizontalPad*2+input[1][0].length));
  }
  let n = 0;
  let output = [];
  let sum = 0;

  for (let loop=0;loop<loopLength;loop++) {
  
    n = 0;
    if (image[0][0] == "1") {
      n = 511;
    }

    output = [];
    output.push(enhancement[n].repeat(horizontalPad*2+input[1][0].length));
    for (let i=0;i<image.length-2;i++) {
      let line = enhancement[n];
      for (let j=0;j<image[0].length-2;j++) {
        let binStr = image[i].slice(j,j+3) + image[i+1].slice(j,j+3) + image[i+2].slice(j,j+3);
        let decimal = parseInt(binStr,2);
        line+=enhancement[decimal];
      }
      line+=enhancement[n];
      output.push(line);
    }
    
    output.push(enhancement[n].repeat(horizontalPad*2+input[1][0].length));
    
    sum = 0;
    for (let i=0;i<output.length;i++) {
      //console.log(output[i]);
      sum+= (output[i].match(/1/g) || []).length;
    }

    image = output.slice();

  }

  console.log();
  console.log(sum);
}

export function Part1() {
  enhance(2);
}

export function Part2() {
  enhance(50);
}

