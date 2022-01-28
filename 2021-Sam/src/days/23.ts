import fs from "fs";
import chalk from "chalk";

type Data = [string, string][];

function loadData(): Data {
  const lines: string[] = fs.readFileSync("./inputs/23.txt", "utf8").trim().split("\n");
  const l = lines
    .slice(2)
    .map(l => l.trim().replace(/#/g, ""))
    .filter(i => i);
  return [...l[0]].map((i, n) => [i, l[1][n]] as [string, string]);
}

type Position = [number, number];
type Move = [number, number];
class Burrow {
  amphipods: Amphipod[] = [];
  costTotal = 0;
  costs: number[] = [];
  burrowHistory: Burrow[] = [];
  roomSize: number = 2;

  /*
-1
0
1
2
3
  */

  _rooms: { [key: number]: Amphipod[] } | null = null;
  get rooms() {
    if (this._rooms) return this._rooms;
    this._rooms = this.amphipods.reduce(
      (a, b) => ({
        ...a,
        [b.currentRoom]: [...(a[b.currentRoom] || []), b],
      }),
      {} as { [key: number]: Amphipod[] }
    );
    return this._rooms!;
  }

  get key() {
    return [...this.amphipods]
      .sort((a, b) => a.currentRoom - b.currentRoom || a.position[1] - b.position[1])
      .map(i => i.key)
      .join("||");
  }

  hallwaySpotCache = new Map<number, boolean>();
  isHallwaySpotAvailable(spot: number) {
    if (!this.hallwaySpotCache.has(spot)) {
      this.hallwaySpotCache.set(spot, !this.rooms[-1]?.some(a => a.position[1] === spot));
    }
    return this.hallwaySpotCache.get(spot)!;
  }

  addAmphipod(amphipod: Amphipod) {
    this.amphipods.push(amphipod);
  }

  cloneWithMove(amphipod: Amphipod, move: Position) {
    const clone = new Burrow();
    clone.costTotal = this.costTotal;
    clone.roomSize = this.roomSize;
    clone.burrowHistory = [...this.burrowHistory, this];
    this.amphipods.forEach(i => {
      if (i === amphipod) {
        const resp = i.cloneWithMove(clone, move);
        clone.costTotal += resp[1];
        clone.costs = [...this.costs, resp[1]];
        return resp[0];
      }
      return i.clone(clone);
    });
    return clone;
  }

  renderPosition(position: Position) {
    const amphipod = this.amphipods.find(
      i => i.currentRoom === position[0] && i.position[1] === position[1]
    );
    if (amphipod) {
      return chalk[amphipod.isInFinalPosition ? "italic" : "white"]`${amphipod.type}`;
    }
    return ".";
  }

  render() {
    console.log(`#############${this.costTotal}|${this.costs.join(",")}
#${this.renderPosition([-1, 0])}${this.renderPosition([-1, 1])}.${this.renderPosition([
      -1, 2,
    ])}.${this.renderPosition([-1, 3])}.${this.renderPosition([-1, 4])}.${this.renderPosition([
      -1, 5,
    ])}${this.renderPosition([-1, 6])}#
###${this.renderPosition([0, 0])}#${this.renderPosition([1, 0])}#${this.renderPosition([
      2, 0,
    ])}#${this.renderPosition([3, 0])}###
  #${this.renderPosition([0, 1])}#${this.renderPosition([1, 1])}#${this.renderPosition([
      2, 1,
    ])}#${this.renderPosition([3, 1])}#${
      this.roomSize === 4
        ? `
  #${this.renderPosition([0, 2])}#${this.renderPosition([1, 2])}#${this.renderPosition([
            2, 2,
          ])}#${this.renderPosition([3, 2])}#
  #${this.renderPosition([0, 3])}#${this.renderPosition([1, 3])}#${this.renderPosition([
            2, 3,
          ])}#${this.renderPosition([3, 3])}#`
        : ""
    }
  #########`);
  }
}

enum AmphipodType {
  Amber = "A",
  Bronze = "B",
  Copper = "C",
  Desert = "D",
}

class Amphipod {
  static TypeIndex = {
    [AmphipodType.Amber]: 0,
    [AmphipodType.Bronze]: 1,
    [AmphipodType.Copper]: 2,
    [AmphipodType.Desert]: 3,
  };

  static TypeCost = {
    [AmphipodType.Amber]: 1,
    [AmphipodType.Bronze]: 10,
    [AmphipodType.Copper]: 100,
    [AmphipodType.Desert]: 1000,
  };
  burrow: Burrow;
  type: AmphipodType;
  position: Position;

  constructor(burrow: Burrow, type: AmphipodType, position: Position) {
    this.burrow = burrow;
    this.burrow.addAmphipod(this);
    this.type = type;
    this.position = position;
  }

  get key() {
    return `${this.type}|${this.currentRoom}|${this.position[1]}`;
  }

  clone(burrow: Burrow) {
    return new Amphipod(burrow, this.type, this.position);
  }

  static hallwayStandardised(spot: number) {
    if (spot === 0) return spot;
    if (spot === 6) return spot * 2 - 2;
    return spot * 2 - 1;
  }

  static roomStandardised(room: number) {
    return [2, 4, 6, 8][room];
  }

  static distance(a: Position, b: Position) {
    if (a[0] === -1 && b[0] === -1) throw "Invalid move";
    if (a[0] !== -1 && b[0] !== -1) throw "Invalid move";
    let hallway: Position, room: Position;
    if (a[0] === -1) {
      hallway = a;
      room = b;
    } else {
      hallway = b;
      room = a;
    }
    const hallwaySpot = this.hallwayStandardised(hallway[1]);
    const roomSpot = this.roomStandardised(room[0]);

    return Math.abs(hallwaySpot - roomSpot) + (room[1] + 1);
  }

  cloneWithMove(burrow: Burrow, move: Position): [Amphipod, number] {
    let cost = Amphipod.distance(this.position, move) * Amphipod.TypeCost[this.type];

    return [new Amphipod(burrow, this.type, move), cost];
  }

  get currentRoom() {
    return this.position[0];
  }

  get goalRoom(): number {
    return Amphipod.TypeIndex[this.type];
  }

  get isInFinalPosition(): boolean {
    return (
      (!this.burrow.rooms[this.goalRoom]?.some(i => i.type !== this.type) ||
        this.position[1] === this.burrow.roomSize - 1) &&
      this.currentRoom === this.goalRoom
    );
  }

  get isInHallway() {
    return this.currentRoom === -1;
  }

  getMoves(): Move[] {
    if (this.isInFinalPosition) return [];

    if (this.isInHallway) {
      let isValid = true;
      if (
        !this.burrow.amphipods.some(i => i.currentRoom === this.goalRoom && i.type !== this.type)
      ) {
        if (
          Amphipod.hallwayStandardised(this.position[1]) > Amphipod.roomStandardised(this.goalRoom)
        ) {
          // Got the goalRoom + 2 and goalRoom + 1 wrong was around to start with.
          for (let spot = this.position[1] - 1; spot >= this.goalRoom + 2; spot--) {
            if (!this.burrow.isHallwaySpotAvailable(spot)) {
              isValid = false;
              break;
            }
          }
        } else {
          for (let spot = this.position[1] + 1; spot <= this.goalRoom + 1; spot++) {
            if (!this.burrow.isHallwaySpotAvailable(spot)) {
              isValid = false;
              break;
            }
          }
        }
        if (isValid) {
          return [
            [
              this.goalRoom,
              this.burrow.roomSize - 1 - (this.burrow.rooms[this.goalRoom]?.length ?? 0),
            ],
          ];
        }
        return [];
      }

      return [];
    }

    /*
#############
#01.2.3.4.56#
###0#1#2#3###
  #.#.#.#.#
  #########
    */

    if (this.burrow.roomSize - this.burrow.rooms[this.currentRoom].length < this.position[1]) {
      return [];
    }

    // if (this.burrow.rooms[this.currentRoom].length === 2 && this.position[1] === 1) {
    //   return [];
    // }

    const moves: Position[] = [];

    for (let spot = this.currentRoom + 1; spot >= 0; spot--) {
      if (this.burrow.isHallwaySpotAvailable(spot)) {
        moves.push([-1, spot]);
      } else {
        break;
      }
    }

    for (let spot = this.currentRoom + 2; spot <= 6; spot++) {
      if (this.burrow.isHallwaySpotAvailable(spot)) {
        moves.push([-1, spot]);
      } else {
        break;
      }
    }

    return moves;
  }
}

function squashBurrows(burrows: Burrow[]) {
  const keys = new Map<string, Burrow>();
  for (const burrow of burrows) {
    const key = burrow.key;
    if (!keys.has(key)) {
      keys.set(key, burrow);
    } else {
      if (keys.get(key)!.costTotal > burrow.costTotal) {
        keys.set(key, burrow);
      }
    }
  }
  return [...keys.values()];
}

function run(burrow: Burrow) {
  // const completedBurrows = [];

  let burrows: Burrow[] = [burrow];

  for (let step = 0; step < 100 && burrows.length > 0; step++) {
    console.log(chalk.blue`Step ${step}: ${burrows.length} burrows`);
    // const finalPositionCountFrequencies: { [key: number]: number } = {};
    if (burrows.length === 1 && step > 3) return burrows[0];
    const newBurrows: Burrow[] = [];
    for (const burrow of burrows) {
      // const isInFinalPositionCount = [...burrow.amphipods].filter(i => i.isInFinalPosition).length;
      // finalPositionCountFrequencies[isInFinalPositionCount] =
      //   (finalPositionCountFrequencies[isInFinalPositionCount] || 0) + 1;
      // if (isInFinalPositionCount === 8) {
      // if (!burrow.amphipods.some(i => !i.isInFinalPosition)) {
      //   completedBurrows.push(burrow);
      //   continue;
      // }
      for (const amphipod of burrow.amphipods) {
        const moves = amphipod.getMoves();
        for (const move of moves) {
          newBurrows.push(burrow.cloneWithMove(amphipod, move));
        }
      }
    }
    burrows = squashBurrows(newBurrows);
  }
  throw "Could not find burrow";
  // return completedBurrows;
}

export function Part1() {
  const data = loadData();

  const burrow = new Burrow();

  for (let room = 0; room < data.length; room++) {
    new Amphipod(burrow, data[room][0] as AmphipodType, [room, 0]);
    new Amphipod(burrow, data[room][1] as AmphipodType, [room, 1]);
  }

  const finalBurrow = run(burrow);

  for (const pastBurrow of finalBurrow.burrowHistory) {
    pastBurrow.render();
  }
  finalBurrow.render();

  console.log(chalk.blue.bold`Answer: ${0}`);
}

export function Part2() {
  const data = loadData();

  const burrow = new Burrow();
  burrow.roomSize = 4;

  const extra = [
    [AmphipodType.Desert, AmphipodType.Desert],
    [AmphipodType.Copper, AmphipodType.Bronze],
    [AmphipodType.Bronze, AmphipodType.Amber],
    [AmphipodType.Amber, AmphipodType.Copper],
  ];
  for (let room = 0; room < data.length; room++) {
    new Amphipod(burrow, data[room][0] as AmphipodType, [room, 0]);
    new Amphipod(burrow, extra[room][0] as AmphipodType, [room, 1]);
    new Amphipod(burrow, extra[room][1] as AmphipodType, [room, 2]);
    new Amphipod(burrow, data[room][1] as AmphipodType, [room, 3]);
  }

  const finalBurrow = run(burrow);

  for (const pastBurrow of finalBurrow.burrowHistory) {
    pastBurrow.render();
  }
  finalBurrow.render();

  console.log(chalk.blue.bold`Answer: ${0}`);
}
