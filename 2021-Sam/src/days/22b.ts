import fs from "fs";
import chalk from "chalk";

type DataRow = [boolean, Record<string, [number, number]>];
type Data = DataRow[];

function loadData(): Data {
  const input: string[][] = fs
    .readFileSync("./inputs/22.txt", "utf8")
    .trim()
    .split("\n")
    .map(i => i.split(" "));
  return input
    .map(i => [i[0] === "on", i[1].split(",").map(j => j.split(/=|\.\./))] as [boolean, string[][]])
    .map(i => [i[0], Object.fromEntries(i[1].map(i => [i[0], [Number(i[1]), Number(i[2])]]))]) as [
    boolean,
    Record<string, [number, number]>
  ][];
}

export function Part1() {
  const data = loadData();

  const on = new Set<string>();

  for (const row of data) {
    const minX = Math.max(-50, Math.min(...row[1].x));
    const maxX = Math.min(50, Math.max(...row[1].x));
    for (let x = minX; x <= maxX; x++) {
      const minY = Math.max(-50, Math.min(...row[1].y));
      const maxY = Math.min(50, Math.max(...row[1].y));
      for (let y = minY; y <= maxY; y++) {
        const minZ = Math.max(-50, Math.min(...row[1].z));
        const maxZ = Math.min(50, Math.max(...row[1].z));
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

interface IDataRegion {
  x: [number, number];
  y: [number, number];
  z: [number, number];
  value: number;
}

class DataRegion implements IDataRegion {
  x: [number, number];
  y: [number, number];
  z: [number, number];
  value: number;

  constructor(data: IDataRegion);
  constructor(x: [number, number], y: [number, number], z: [number, number], value: number);
  constructor(
    x: [number, number] | IDataRegion,
    y?: [number, number],
    z?: [number, number],
    value?: number
  ) {
    if (typeof x === "object") {
      let data = x as IDataRegion;
      this.x = data.x;
      this.y = data.y;
      this.z = data.z;
      this.value = data.value;
    } else {
      if (y === undefined || z === undefined || value === undefined) throw "Invalid arguments";
      this.x = x;
      this.y = y;
      this.z = z;
      this.value = value;
    }
  }

  get volume() {
    return (this.x[1] + 1 - this.x[0]) * (this.y[1] + 1 - this.y[0]) * (this.z[1] + 1 - this.z[0]);
  }

  get valueModifiedVolume() {
    return this.value * this.volume;
  }

  static doLinesOverlap(a: [number, number], b: [number, number]) {
    return a[0] <= b[1] && a[1] >= b[0];
  }

  static isValidRegion(region: IDataRegion) {
    return region.x[0] <= region.x[1] && region.y[0] <= region.y[1] && region.z[0] <= region.z[1];
  }

  static doRegionsOverlap(a: IDataRegion, b: IDataRegion) {
    const xOverlap = DataRegion.doLinesOverlap(a.x, b.x);
    const yOverlap = DataRegion.doLinesOverlap(a.y, b.y);
    const zOverlap = DataRegion.doLinesOverlap(a.z, b.z);
    if (xOverlap && yOverlap && zOverlap) {
      return true;
    }
    return false;
  }
}

class DataStore {
  regions: DataRegion[] = [];
  rowsCalculated: DataRow[] = [];

  get on() {
    return this.regions.reduce((a, b) => {
      return a + b.valueModifiedVolume;
    }, 0);
  }

  static clipRegion(a: IDataRegion, b: IDataRegion): DataRegion {
    return new DataRegion({
      x: [Math.max(a.x[0], b.x[0]), Math.min(a.x[1], b.x[1])],
      y: [Math.max(a.y[0], b.y[0]), Math.min(a.y[1], b.y[1])],
      z: [Math.max(a.z[0], b.z[0]), Math.min(a.z[1], b.z[1])],
      value: a.value,
    });
  }

  static removeOverlap(region: IDataRegion, removeRegion: IDataRegion): DataRegion[] {
    function getValue(coord: "x" | "y" | "z", val: number): [number, number] {
      const v = [
        region[coord][0],
        removeRegion[coord][0],
        removeRegion[coord][1] + 1,
        region[coord][1],
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
    const regions: DataRegion[] = [];
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          const newRegion = DataStore.clipRegion(
            {
              x: getValue("x", x),
              y: getValue("y", y),
              z: getValue("z", z),
              value: region.value,
            },
            region
          );
          if (
            DataRegion.isValidRegion(newRegion) &&
            !DataRegion.doRegionsOverlap(newRegion, removeRegion)
          ) {
            regions.push(new DataRegion(newRegion));
          }
        }
      }
    }
    return regions;
  }

  addRegion(region: DataRegion) {
    // Get all existing regions, and whether they overlap with the new region
    const allRegions = this.regions.map(
      i => [i, DataRegion.doRegionsOverlap(region, i)] as [DataRegion, boolean]
    );
    const overlapping = allRegions.filter(i => i[1]).map(i => i[0]);

    if (overlapping.length > 0) {
      // Initialise array for next regions
      const nextRegions: DataRegion[] = [];

      // Keep all regions that are not overlapping
      nextRegions.push(...allRegions.filter(i => !i[1]).map(i => i[0]));

      // Keep sections from overlapping regions which are not overlapping
      for (const overlapRegion of overlapping) {
        nextRegions.push(...DataStore.removeOverlap(overlapRegion, region));
      }

      // Keep new region
      nextRegions.push(region);
      this.regions = nextRegions;
    } else {
      // No overlaps, just add region
      this.regions.push(region);
    }
  }

  addRow(row: DataRow) {
    this.rowsCalculated.push(row);
    this.addRegion(
      new DataRegion({
        x: [Math.min(...row[1].x), Math.max(...row[1].x)],
        y: [Math.min(...row[1].y), Math.max(...row[1].y)],
        z: [Math.min(...row[1].z), Math.max(...row[1].z)],
        value: row[0] ? 1 : 0,
      })
    );
  }
}

export function Part2() {
  const input = loadData();

  const data = new DataStore();

  let index = 0;
  for (const row of input) {
    data.addRow(row);
    console.log(chalk.blue`Row ${index + 1} - ${data.on} Cubes On`);
    index++;
  }

  console.log(chalk.green.bold`Answer: ${data.on}`);
  if (data.on !== 1323862415207825) {
    console.log(chalk.red.bold`Incorrect Answer, Should be 1323862415207825`);
  }
  fs.writeFileSync("./outputs/22-2.json", JSON.stringify(data.regions.filter(i => i.value)))
}

export function Test() {
  console.log(
    DataStore.removeOverlap(
      {
        x: [0, 10],
        y: [0, 10],
        z: [0, 1],
        value: 1,
      },
      {
        x: [5, 15],
        y: [5, 15],
        z: [0, 15],
        value: 0,
      }
    )
  );
  // console.log(
  //   DataStore.removeOverlap(
  //     {
  //       x: [10, 12],
  //       y: [10, 12],
  //       z: [10, 12],
  //       value: 1,
  //     },
  //     {
  //       x: [11, 13],
  //       y: [11, 13],
  //       z: [11, 13],
  //       value: 0,
  //     }
  //   )
  // );
  console.log(
    DataStore.removeOverlap(
      { x: [11, 13], y: [11, 13], z: [11, 13], value: 1 },
      { x: [9, 11], y: [9, 11], z: [9, 11], value: 0 }
    )
  );
}
