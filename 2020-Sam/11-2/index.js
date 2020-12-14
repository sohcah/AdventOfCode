const fs = require('fs');
const input = fs.readFileSync('input.txt','utf8').split('\n').map(i=>i.split(''));
const width = input[0].length;
const height = input.length;

for(let z = 0;z < 1000;z++) {
  const previousInput = input.map(i=>i.join('')).join('\n').split('\n').map(i=>i.split(''));

  for(let x = 0;x < height;x++){
    for(let y = 0;y < width;y++){
      if(input[x][y] === '.') continue;
      let surrounds = 0;
      for(var xb = -1;xb < 2;xb++){
        for(var yb = -1;yb < 2;yb++){
          for(var zb = 1;zb < 1000;zb++) {
            if((xb !== 0 || yb !== 0)) {
              const xxx = previousInput[x + (xb * zb)]?.[y + (yb * zb)];
              if(xxx === "#") {
                surrounds++;
                break;
              }
              if(!xxx || xxx === "L") break;
            } else break
          }
        }
      }
      if(surrounds === 0 && input[x][y] === "L") {
        input[x][y] = `#`;
      } else if(surrounds >= 5 && input[x][y] === "#") {
        input[x][y] = `L`;
      }
    }
  }

  console.log(input.map(i=>i.join('')).join('\n'));
  console.log('\n\n\n\n')

  if(previousInput.flat().join('') === input.flat().join('')) {
    console.log(previousInput.flat().filter(i=>i === "#").length)
    break;
  }
}