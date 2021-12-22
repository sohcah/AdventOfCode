// Coded with Paul Hindess-style
import fs from "fs";
import chalk from "chalk";

type Box = [[number, number], [number, number], [number, number]];
type Instruction = [boolean, Box];
type Region = [Box, number];

function loadData(): Instruction[] {
  const input: string[][] = fs
    .readFileSync("./inputs/22.txt", "utf8")
    .trim()
    .split("\n")
    .map(i => i.split(" "));
  const instructions: Instruction[] = [];
  for (let i = 0; i < input.length; i++) {
    const instruction = input[i];
    const coordinates = instruction[1].split(",").map(j => j.split(/=|\.\./).slice(1).map(k => Number(k))) as Box;
    if (instruction[0] === "on") {
      instructions.push([true, coordinates]);
    } else {
      instructions.push([false, coordinates]);
    }
  }
  return instructions;
}

export function Part1() {
  const data = loadData();

  const on = new Set<string>();

  for (const row of data) {
    const minX = Math.max(-50, Math.min(row[1][0][0], row[1][0][1]));
    const maxX = Math.min(50, Math.max(row[1][0][0], row[1][0][1]));
    for (let x = minX; x <= maxX; x++) {
      const minY = Math.max(-50, Math.min(row[1][1][0], row[1][1][1]));
      const maxY = Math.min(50, Math.max(row[1][1][0], row[1][1][1]));
      for (let y = minY; y <= maxY; y++) {
        const minZ = Math.max(-50, Math.min(row[1][2][0], row[1][2][1]));
        const maxZ = Math.min(50, Math.max(row[1][2][0], row[1][2][1]));
        for (let z = minZ; z <= maxZ; z++) {
          const key = `${x},${y},${z}`;
          if (row[0]) {
            on.add(key);
          } else {
            on.delete(key);
          }
        }
      }
    }
  }

  console.log(chalk.green.bold`Answer: ${on.size}`);
}

export function Part2() {
  const input = loadData();

  let regions: Region[] = [];

  function getVolume(region: Region) {
    return (
      (region[0][0][1] + 1 - region[0][0][0]) *
      (region[0][1][1] + 1 - region[0][1][0]) *
      (region[0][2][1] + 1 - region[0][2][0])
    );
  }

  function getValueModifiedVolume(region: Region) {
    return region[1] * getVolume(region);
  }

  function doLinesOverlap(a: [number, number], b: [number, number]) {
    return a[0] <= b[1] && a[1] >= b[0];
  }

  function isValidRegion(region: Region) {
    return (
      region[0][0][0] <= region[0][0][1] &&
      region[0][1][0] <= region[0][1][1] &&
      region[0][2][0] <= region[0][2][1]
    );
  }

  function doRegionsOverlap(a: Region, b: Region) {
    const xOverlap = doLinesOverlap(a[0][0], b[0][0]);
    const yOverlap = doLinesOverlap(a[0][1], b[0][1]);
    const zOverlap = doLinesOverlap(a[0][2], b[0][2]);
    if (xOverlap && yOverlap && zOverlap) {
      return true;
    }
    return false;
  }
  
  function getCellsOn() {
    return regions.reduce((a, b) => {
      return a + getValueModifiedVolume(b);
    }, 0);
  }

  function clipRegion(a: Region, b: Region): Region {
    return [
      [
        [Math.max(a[0][0][0], b[0][0][0]), Math.min(a[0][0][1], b[0][0][1])],
        [Math.max(a[0][1][0], b[0][1][0]), Math.min(a[0][1][1], b[0][1][1])],
        [Math.max(a[0][2][0], b[0][2][0]), Math.min(a[0][2][1], b[0][2][1])],
      ],
      a[1],
    ];
  }

  function removeOverlap(region: Region, removeRegion: Region): Region[] {
    function getValue(coord: 0 | 1 | 2, val: number): [number, number] {
      const v = [
        region[0][coord][0],
        removeRegion[0][coord][0],
        removeRegion[0][coord][1] + 1,
        region[0][coord][1],
      ];
      if (val === -1) {
        return [v[0], v[1] - 1];
      }
      if (val === 0) {
        return [v[1], v[2] - 1];
      }
      if (val === 1) {
        return [v[2], v[3]];
      }
      throw "Invalid value";
    }
    const regions: Region[] = [];
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          const newRegion = clipRegion(
            [[getValue(0, x), getValue(1, y), getValue(2, z)], region[1]],
            region
          );
          if (isValidRegion(newRegion) && !doRegionsOverlap(newRegion, removeRegion)) {
            regions.push(newRegion);
          }
        }
      }
    }
    return regions;
  }

  function addRegion(region: Region) {
    // Get all existing regions, and whether they overlap with the new region
    const allRegions = regions.map(i => [i, doRegionsOverlap(region, i)] as [Region, boolean]);
    const overlapping = allRegions.filter(i => i[1]).map(i => i[0]);

    if (overlapping.length > 0) {
      // Initialise array for next regions
      const nextRegions: Region[] = [];

      // Keep all regions that are not overlapping
      nextRegions.push(...allRegions.filter(i => !i[1]).map(i => i[0]));

      // Keep sections from overlapping regions which are not overlapping
      for (const overlapRegion of overlapping) {
        nextRegions.push(...removeOverlap(overlapRegion, region));
      }

      // Keep new region
      nextRegions.push(region);
      regions = nextRegions;
    } else {
      // No overlaps, just add region
      regions.push(region);
    }
  }

  function addInstruction(instruction: Instruction) {
    addRegion([
      [
        [
          Math.min(instruction[1][0][0], instruction[1][0][1]),
          Math.max(instruction[1][0][0], instruction[1][0][1]),
        ],
        [
          Math.min(instruction[1][1][0], instruction[1][1][1]),
          Math.max(instruction[1][1][0], instruction[1][1][1]),
        ],
        [
          Math.min(instruction[1][2][0], instruction[1][2][1]),
          Math.max(instruction[1][2][0], instruction[1][2][1]),
        ],
      ],
      instruction[0] ? 1 : 0,
    ]);
  }

  let index = 0;
  for (const row of input) {
    addInstruction(row);
    console.log(chalk.blue`Row ${index + 1} - ${getCellsOn()} Cubes On`);
    index++;
  }

  console.log(chalk.green.bold`Answer: ${getCellsOn()}`);
  if (getCellsOn() !== 1323862415207825) {
    console.log(chalk.red.bold`Incorrect Answer, Should be 1323862415207825`);
  }
  fs.writeFileSync("./outputs/22-2.json", JSON.stringify(regions.filter(i => i[1])));
}
