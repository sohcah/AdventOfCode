import {loadLines, output} from "aocutils";

const instructions = loadLines().map(i => i.split(" ")).map(i => [i[0], Number(i[1])] as const);

let registerX = 1;
let instructionNumber = 0;
let instructionCyclesRemaining = 0;

const length: Record<string, number> = {
  noop: 1,
  addx: 2,
}

let sum = 0;

let crtImage = "\n";

for (let cycle = 1; cycle <= 240; cycle++) {
  if(cycle % 40 === 20) {
    sum += registerX * cycle;
  }


  const scanPos = (cycle + 39) % 40;
  console.log(scanPos, registerX);
  if(scanPos === registerX || scanPos === registerX + 1 || scanPos === registerX - 1) {
    crtImage += "#";
  } else {
    crtImage += ".";
  }

  if(cycle % 40 === 0) {
    crtImage += "\n";
  }

  const [op, arg] = instructions[instructionNumber];

  if(instructionCyclesRemaining === 0) {
    instructionCyclesRemaining = length[op];
  }

  instructionCyclesRemaining--;
  if (instructionCyclesRemaining === 0) {
    switch (op) {
      case 'noop':
        break;
      case 'addx':
        registerX += arg;
        break;
    }
    instructionNumber++;
  }
}

output(crtImage).forTest(`
##..##..##..##..##..##..##..##..##..##..
###...###...###...###...###...###...###.
####....####....####....####....####....
#####.....#####.....#####.....#####.....
######......######......######......####
#######.......#######.......#######.....
`);
