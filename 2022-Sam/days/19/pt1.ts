import {adjacentPositionsWithoutDiagonals, loadLines, loadTrimmed, output, range, SMap} from "aocutils";

const blueprints = loadLines().map(i => i.match(/\d+/g).map(Number)).map(i => ({
  blueprint: i[0],
  ore: {
    ore: i[1]
  },
  clay: {
    ore: i[2],
  },
  obsidian: {
    ore: i[3],
    clay: i[4],
  },
  geode: {
    ore: i[5],
    obsidian: i[6],
  }
}));

console.log(blueprints);

let sum = 0;

function inc(...v: [
  ("ore" | "clay" | "obsidian" | "geode")[],
  { [key in "ore" | "clay" | "obsidian" | "geode"]: number }
]) {
  const newCount = {...v[1]};
  for(const robot of v[0]) {
    newCount[robot]++;
  }
  return newCount;
}

for (const bp of blueprints) {
  let paths: [
    ("ore" | "clay" | "obsidian" | "geode")[],
    { [key in "ore" | "clay" | "obsidian" | "geode"]: number }
  ][][] = [[[["ore"], {ore: 0, clay: 0, obsidian: 0, geode: 0}]]];
  for(let i = 0;i < 24;i++) {
    console.log(bp.blueprint, i, paths.length)
    const newPaths: [
      ("ore" | "clay" | "obsidian" | "geode")[],
      { [key in "ore" | "clay" | "obsidian" | "geode"]: number }
    ][][] = [];
    for (const path of paths) {
      const newCount = {...path[0][1]};
      newPaths.push([[path[0][0], inc(path[0][0], newCount)], ...path]);
      if(bp.ore.ore <= newCount.ore) {

        newPaths.push([[["ore", ...path[0][0]], inc(path[0][0], {
          ...newCount,
          ore: newCount.ore - bp.ore.ore,
        })], ...path]);
      }

      if(bp.clay.ore <= newCount.ore) {
        newPaths.push([[["clay", ...path[0][0]], inc(path[0][0], {
          ...newCount,
          ore: newCount.ore - bp.clay.ore,
        })], ...path]);
      }

      if(bp.obsidian.ore <= newCount.ore && bp.obsidian.clay <= newCount.clay) {
        // console.log("obsidian", newCount);
        newPaths.push([[["obsidian", ...path[0][0]], inc(path[0][0], {
          ...newCount,
          ore: newCount.ore - bp.obsidian.ore,
          clay: newCount.clay - bp.obsidian.clay,
        })], ...path]);
      }

      if(bp.geode.ore <= newCount.ore && bp.geode.obsidian <= newCount.obsidian) {
        // console.log("geode", newCount);
        newPaths.push([[["geode", ...path[0][0]], inc(path[0][0], {
          ...newCount,
          ore: newCount.ore - bp.geode.ore,
          obsidian: newCount.obsidian - bp.geode.obsidian,
        })], ...path]);
      }
    }
    newPaths.sort((a, b) => b[0][1].ore - a[0][1].ore);
    newPaths.sort((a, b) => b[0][1].clay - a[0][1].clay);
    newPaths.sort((a, b) => b[0][0].filter(i=>i==="obsidian").length - a[0][0].filter(i=>i==="obsidian").length);
    newPaths.sort((a, b) => b[0][1].obsidian - a[0][1].obsidian);
    newPaths.sort((a, b) => b[0][0].filter(i=>i==="geode").length - a[0][0].filter(i=>i==="geode").length);
    newPaths.sort((a, b) => b[0][1].geode - a[0][1].geode);
    paths = newPaths.slice(0, 7000);
  }
  const bestPath = paths.sort((a, b) => b[0][1].geode - a[0][1].geode)[0];
  // console.log(bestPath);
  sum += bestPath[0][1].geode * bp.blueprint;
}

output(sum).forTest(33);
