import {loadLines, loadNumbers, loadTrimmed, output, sum} from "aocutils";

const input = loadTrimmed();
const elves = input.split("\n\n");

const elvCounts = []
for(const elf of elves) {
  const elfCount = sum(elf.split("\n").map(Number));
  elvCounts.push(elfCount);
}

elvCounts.sort((a,b) => b-a);

output(sum(elvCounts.slice(0, 3))).forTest(45000);
