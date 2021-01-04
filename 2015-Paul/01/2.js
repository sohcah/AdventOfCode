const testMode = process.argv.includes('test');
const fs = require('fs');
const input = fs.readFileSync(testMode ? 'test.txt' : 'input.txt', 'utf8');

// YOUR CODE HERE
const output = 3024;

if(testMode) {
  if(output !== 23) {
    console.error('\x1b[31mTest Failed - Incorrect Output')
  };
}

console.log(output);