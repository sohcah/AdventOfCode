const testMode = process.argv.includes('test');
const fs = require('fs');
const input = fs.readFileSync(testMode ? 'test.txt' : 'input.txt', 'utf8');


let finalfloor = input.split(")").join("").length - input.split("(").join("").length

const output = finalfloor;

if(testMode) {
  if(output !== 4) {
    console.error('\x1b[31mTest Failed - Incorrect Output')
  } else {
    console.log("\x1b[32mTest Succeeded - Correct Output");
  };
}

console.log(output);