const testMode = process.argv.includes('test');
const fs = require('fs');
const input = fs.readFileSync(testMode ? 'test.txt' : 'input.txt', 'utf8');

let pos = new Set();
let down = [200,200];
let across = [200,200];

pos.add(down[0]*400+across[0]);
for (i=0;i<input.length;i++) {
  let j = i % 2;
  if (input[i]=="^") {down[j]--};
  if (input[i]=="v") {down[j]++};
  if (input[i]=="<") {across[j]--};
  if (input[i]==">") {across[j]++};
  pos.add(down[j]*400+across[j]);
}

const output = pos.size;

if(testMode) {
  if(output !== 3) {
    console.error('\x1b[31mTest Failed - Incorrect Output')
  } else {
    console.log("\x1b[32mTest Succeeded - Correct Output");
  };
}

console.log(output);