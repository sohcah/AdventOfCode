import { output } from "aocutils";

const input = load().split(",");

// console.log(input);

function hash(str: string) {
  let hash = 0;
  for (const chr of str) {
    hash += chr.charCodeAt(0);
    hash *= 17;
    hash %= 256;
  }

  return hash;
}

type Lens = { label: string; num: number };

const boxes = new Array(256).fill(null).map(() => [] as Lens[]);

for (const step of input) {
  const [label, numStr] = step.split(/[=-]/);
  const box = boxes[hash(label)];
  const operation = step[label.length];
  if (operation === "-") {
    const index = box.findIndex((i) => i.label === label);
    if (index !== -1) {
      box.splice(index, 1);
    }
  } else {
    const num = Number(numStr);
    const index = box.findIndex((i) => i.label === label);
    const item = { label, num };
    if (index !== -1) {
      box.splice(index, 1, item);
    } else {
      box.push(item);
    }
  }
  // console.log(boxes.slice(0, 4));
}

let sum = 0;
for (let b = 0; b < boxes.length; b++) {
  const box = boxes[b];
  for (let l = 0; l < box.length; l++) {
    const lens = box[l];
    sum += (b + 1) * (l + 1) * lens.num;
  }
}

output(sum).forTest(145).forActual(252782);
