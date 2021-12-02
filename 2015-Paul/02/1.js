const testMode = process.argv.includes('test');
const fs = require('fs');
const input = fs.readFileSync(testMode ? 'test.txt' : 'input.txt', 'utf8').split("\n").map(i=>i.split("x").map(i=>Number(i)));

console.log(input);

let sqft = 0;
for (i=0;i<input.length;i++) {
  sqft += 2*(input[i][0]*input[i][1]+input[i][0]*input[i][2]+input[i][1]*input[i][2]) + input[i][0]*input[i][1]*input[i][2]/Math.max(...input[i]);
  //console.log(sqft);
}

const output = sqft;

if(testMode) {
  if(output !== 101) {
    console.error('\x1b[31mTest Failed - Incorrect Output')
  } else {
    console.log("\x1b[32mTest Succeeded - Correct Output");
  };
}

console.log(output);