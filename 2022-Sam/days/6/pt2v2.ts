import {loadTrimmed, output, CountedSet} from "aocutils";

const input = loadTrimmed();

let answer;

const count = new CountedSet();

for (let i = 0; i < input.length; i++) {
  count.add(input[i]);
  if (input[i - 14]) {
    count.delete(input[i - 14]);
  }

  if (count.size === 14) {
    answer = i + 1;
    break;
  }
}

output(answer).forTest(19);
