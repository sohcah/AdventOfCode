import fs from "fs";

export function Part1() {
  const lines = fs
    .readFileSync("./inputs/2.txt", "utf8")
    .trim()
    .replace(/forward/g, "f")
    .replace(/up/g, "u")
    .replace(/down/g, "d")
    .split("\n")
    .map(i => i.split(" "));
  let horiz = 0;
  let depth = 0;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i][0] == "f") {
      horiz += Number(lines[i][1]);
    }
    if (lines[i][0] == "d") {
      depth += Number(lines[i][1]);
    }
    if (lines[i][0] == "u") {
      depth -= Number(lines[i][1]);
    }
  }
  console.log(horiz, depth, horiz * depth);
}

export function Part2() {
  const lines = fs
    .readFileSync("./inputs/2.txt", "utf8")
    .trim()
    .replace(/forward/g, "f")
    .replace(/up/g, "u")
    .replace(/down/g, "d")
    .split("\n")
    .map(i => i.split(" "));
  let horiz = 0;
  let depth = 0;
  let aim = 0;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i][0] == "f") {
      horiz += Number(lines[i][1]);
      depth += Number(lines[i][1]) * aim;
    }
    if (lines[i][0] == "d") {
      aim += Number(lines[i][1]);
    }
    if (lines[i][0] == "u") {
      aim -= Number(lines[i][1]);
    }
  }
  console.log(horiz, depth, horiz * depth);
}
