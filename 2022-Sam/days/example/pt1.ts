import {loadNumbers, output} from "aocutils";

const input = loadNumbers();

let count = 0;
for (let i = 1; i < input.length; i++) {
  if (input[i] > input[i - 1]) {
    count++;
  }
}

output(count).forTest(7);
