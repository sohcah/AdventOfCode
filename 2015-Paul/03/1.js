const testMode = process.argv.includes('test');
const fs = require('fs');
const input = fs.readFileSync(testMode ? 'test.txt' : 'input.txt', 'utf8');

let pos = new Set();
let down = 200;
let across = 200;
pos.add(down*400+across);
for (i=0;i<input.length;i++) {
  if (input[i]=="^") {down--};
  if (input[i]=="v") {down++};
  if (input[i]=="<") {across--};
  if (input[i]==">") {across++};
  pos.add(down*400+across);
}


const output = pos.size;

if(testMode) {
  if(output !== 4) {
    console.error('\x1b[31mTest Failed - Incorrect Output')
  } else {
    console.log("\x1b[32mTest Succeeded - Correct Output");
  };
}

console.log(output);