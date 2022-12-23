import {CountedSet, IS_TEST, loadLines, output} from "aocutils";

const grid = loadLines().map(i => i.split(""));

console.log(grid);

output(100).forTest(110);
