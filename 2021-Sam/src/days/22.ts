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

  console.log(chalk.red.bold`Answer: ${on.size}`);
}

interface DataRegion {
  x: [number, number];
  y: [number, number];
  z: [number, number];
  value: number;
}

class DataStore {
  regions: DataRegion[] = [];
  rowsCalculated: DataRow[] = [];

  get on() {
    return this.regions
      .filter(i => i.value)
      .reduce((a, b) => {
        return a + (b.x[1] + 1 - b.x[0]) * (b.y[1] + 1 - b.y[0]) * (b.z[1] + 1 - b.z[0]);
      }, 0);
  }

  static lineOverlap(a: [number, number], b: [number, number]) {
    return (
      (a[0] <= b[1] && a[1] >= b[1]) ||
      (a[0] <= b[0] && a[1] >= b[0]) ||
      (a[0] <= b[1] && a[1] >= b[0])
    );
  }

  static regionsOverlap(a: DataRegion, b: DataRegion) {
    const xOverlap = DataStore.lineOverlap(a.x, b.x);
    const yOverlap = DataStore.lineOverlap(a.y, b.y);
    const zOverlap = DataStore.lineOverlap(a.z, b.z);
    // console.log(xOverlap, yOverlap, zOverlap);
    if (xOverlap && yOverlap && zOverlap) {
      return true;
    }
    return false;
  }

  static clipRegion(a: DataRegion, b: DataRegion): DataRegion {
    return {
      x: [Math.max(a.x[0], b.x[0]), Math.min(a.x[1], b.x[1])],
      y: [Math.max(a.y[0], b.y[0]), Math.min(a.y[1], b.y[1])],
      z: [Math.max(a.z[0], b.z[0]), Math.min(a.z[1], b.z[1])],
      value: a.value,
    };
  }

  static removeOverlap(a: DataRegion, b: DataRegion): DataRegion[] {
    console.log(a, b);
    // a: existing
    // b: toRemove
    function getValue(coord: "x" | "y" | "z", val: number): [number, number] | null {
      const v = [
        a[coord][0],
        b[coord][0],
        b[coord][1] + 1,
        a[coord][1],
      ];
      const vm1 = [
        a[coord][0] - 1,
        b[coord][0] - 1,
        b[coord][1],
        a[coord][1],
      ];
      if (val === -1) {
        return [v[0], vm1[1]];
      }
      if (val === 0) {
        return [v[1], vm1[2]];
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
          const xC = getValue("x", x);
          const yC = getValue("y", y);
          const zC = getValue("z", z);
          if (!xC || !yC || !zC) continue;
          const region = DataStore.clipRegion(
            {
              x: xC,
              y: yC,
              z: zC,
              value: a.value,
              // value: (x + 2) * 10000 + (y + 2) * 100 + (z + 2),
            },
            a
          );
          // console.log(x, y, z, region);
          if (!DataStore.regionsOverlap(region, b)) {
            regions.push(region);
          }
        }
      }
    }
    return regions.filter(i => i.x[0] <= i.x[1] && i.y[0] <= i.y[1] && i.z[0] <= i.z[1]);
  }

  addRegion(region: DataRegion) {
    const reg: DataRegion[] = [];
    const allRegions = this.regions.map(
      i => [i, DataStore.regionsOverlap(region, i)] as [DataRegion, boolean]
    );
    const overlapping = allRegions.filter(i => i[1]).map(i => i[0]);
    if (overlapping.length > 0) {
      reg.push(...allRegions.filter(i => !i[1]).map(i => i[0]));
      for (const overlapRegion of overlapping) {
        reg.push(...DataStore.removeOverlap(overlapRegion, region));
      }
      reg.push(region);
      this.regions = reg;
    } else {
      this.regions.push(region);
    }
  }

  addRow(row: DataRow) {
    this.rowsCalculated.push(row);
    this.addRegion({
      x: [Math.min(...row[1].x), Math.max(...row[1].x)],
      y: [Math.min(...row[1].y), Math.max(...row[1].y)],
      z: [Math.min(...row[1].z), Math.max(...row[1].z)],
      value: row[0] ? 1 : 0,
    });
  }
}

export function Part2() {
  const input = loadData();

  const data = new DataStore();

  for (const row of input) {
    data.addRow(row);
    console.log(data.regions, data.on);
    // if (data.rowsCalculated.length === 3) break;
  }

  console.log(chalk.red.bold`Answer: ${data.on}`);
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
      { x: [11, 13], y: [11, 13], z: [11, 13], value: 1 } ,{ x: [9, 11], y: [9, 11], z: [9, 11], value: 0 }
    )
  );
}
