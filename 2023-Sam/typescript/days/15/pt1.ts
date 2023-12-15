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

output(input.map(hash).sum).forTest(1320).forActual(521341);
