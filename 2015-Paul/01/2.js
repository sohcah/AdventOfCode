const testMode = process.argv.includes('test');
const fs = require('fs');
const input = fs.readFileSync(testMode ? 'test.txt' : 'input.txt', 'utf8');

let i = 0;
let floor = 0;
while (floor>=0) {
  if (input[i] == "(") {floor++} else {floor--};
  i++;
}
const output = i;

if(testMode) {
  if(output !== 5) {
    console.error('\x1b[31mTest Failed - Incorrect Output')
  };
}

console.log(output);