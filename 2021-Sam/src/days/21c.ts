import fs from "fs";
import chalk from "chalk";

type Data = number[];

function loadData(): Data {
  const input: number[] = fs
    .readFileSync("./inputs/21.txt", "utf8")
    .trim()
    .split("\n")
    .map(i => Number(i.slice("Player 1 starting position: ".length).trim()));
  return input;
}

interface Dice {
  getNumber(): number;
}

class DeterministicDice implements Dice {
  count = 1;
  rollCount = 0;

  getNumber(): number {
    if (this.count > 100) {
      this.count = 1;
    }
    this.rollCount++;
    return this.count++;
  }
}

class Player {
  position: number;
  score: number = 0;

  constructor(position: number) {
    this.position = position;
  }
}

export function Part1() {
  const data = loadData();

  const minimumScore = 1000;
  const dice = new DeterministicDice();
  const players: [Player, Player] = [new Player(data[0]), new Player(data[1])];

  for (let round = 0; round < minimumScore * 2; round++) {
    const playerIndex = round % 2;
    const player = players[playerIndex];

    const diceRolls = [dice.getNumber(), dice.getNumber(), dice.getNumber()];
    const diceRollTotal = diceRolls[0] + diceRolls[1] + diceRolls[2];
    let newPosition = ((player.position + diceRollTotal - 1) % 10) + 1;
    console.log(
      chalk.blue`Round ${round} - Player ${playerIndex + 1} rolled ${diceRolls.join(
        ", "
      )} (${diceRollTotal}), scored ${newPosition} (Total: ${player.score + newPosition})`
    );
    player.score += newPosition;
    player.position = newPosition;
    if (player.score >= 1000) {
      break;
    }
  }

  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  console.log(chalk.green`Answer: ${sortedPlayers[1].score * dice.rollCount}`);
}

interface DiracMapId {
  positionA: number;
  positionB: number;
  scoreA: number;
  scoreB: number;
}

class DiracMap {
  private internalMap: Map<string, number> = new Map();

  constructor(positionA?: number, positionB?: number) {
    if (positionA && positionB) {
      this.internalMap.set(`${positionA}-${positionB}-0-0`, 1);
    }
  }

  private keyFromId(id: DiracMapId): string {
    return `${id.positionA}-${id.positionB}-${id.scoreA}-${id.scoreB}`;
  }

  private idFromKey(key: string): DiracMapId {
    const [positionA, positionB, scoreA, scoreB] = key.split("-").map(Number);
    return { positionA, positionB, scoreA, scoreB };
  }

  add(id: DiracMapId, number: number) {
    const key = this.keyFromId(id);
    const currentCount = this.internalMap.get(key) || 0;
    this.internalMap.set(key, currentCount + number);
  }

  get(id: DiracMapId): number {
    const key = this.keyFromId(id);
    return this.internalMap.get(key) || 0;
  }

  entries(): [DiracMapId, number][] {
    return [...this.internalMap.entries()].map(i => [this.idFromKey(i[0]), i[1]]);
  }

  values(): number[] {
    return this.entries().map(i => i[1]);
  }

  keys(): DiracMapId[] {
    return this.entries().map(i => i[0]);
  }
}

export function Part2() {
  const data = loadData();

  let currentDiracMap = new DiracMap(data[0], data[1]);

  const counts = [0, 0, 0, 0, 0, 0, 0];
  for (let i = 1; i <= 3; i++) {
    for (let j = 1; j <= 3; j++) {
      for (let k = 1; k <= 3; k++) {
        counts[i + j + k - 3]++;
      }
    }
  }

  for (let round = 0; round < 42; round++) {
    let didChange = false;
    const universeCount = currentDiracMap.values().reduce((a, b) => a + b);
    console.log(
      chalk.gray`Round ${round} - ${universeCount.toLocaleString()} Total Universe${
        universeCount === 1 ? "" : "s"
      }`
    );
    const playerIndex = round % 2;

    const nextDiracMap = new DiracMap();
    for (const [id, count] of currentDiracMap.entries()) {
      if (id.scoreA >= 21) {
        nextDiracMap.add({ scoreA: 21, scoreB: 0, positionA: 0, positionB: 0 }, count);
        continue;
      }
      if (id.scoreB >= 21) {
        nextDiracMap.add({ scoreA: 0, scoreB: 21, positionA: 0, positionB: 0 }, count);
        continue;
      }
      const position = [id.positionA, id.positionB][playerIndex];
      const score = [id.scoreA, id.scoreB][playerIndex];
      for (let i = 3; i <= 9; i++) {
        didChange = true;
        const newCount = count * counts[i - 3];
        const newPosition = ((position + i - 1) % 10) + 1;
        const newScore = score + newPosition;
        if (playerIndex === 0) {
          nextDiracMap.add(
            {
              ...id,
              positionA: newPosition,
              scoreA: newScore,
            },
            newCount
          );
        } else {
          nextDiracMap.add(
            {
              ...id,
              positionB: newPosition,
              scoreB: newScore,
            },
            newCount
          );
        }
      }
    }
    if (!didChange) break;
    currentDiracMap = nextDiracMap;
  }

  const players = currentDiracMap.entries();

  console.log(chalk.blue`${(players[0][1] + players[1][1]).toLocaleString()} Total Universes`);
  for (let i = 0; i < 2; i++) {
    console.log(
      chalk.blue`${players[i][1].toLocaleString()} Universes with games won by Player ${i + 1}`
    );
  }
  const sorted = players.sort((a, b) => b[1] - a[1]);
  console.log(chalk.green`Answer: ${sorted[0][1]}`);
  if (sorted[0][1] !== 110271325165726) {
    throw "Answer should be 110271325165726";
  }
}
