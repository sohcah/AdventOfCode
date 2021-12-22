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

class DiracPlayer {
  positionScoreCountMap: Map<`${number}-${number}-${number}-${number}`, number> = new Map();

  constructor(positionA: number, positionB: number) {
    this.positionScoreCountMap.set(`${positionA}-${positionB}-0-0`, 1);
  }
}

export function Part2() {
  const data = loadData();

  const player = new DiracPlayer(data[0], data[1]);

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
    const universeCount = [...player.positionScoreCountMap.values()].reduce((a, b) => a + b);
    console.log(
      chalk.gray`Round ${round} - ${universeCount.toLocaleString()} Total Universe${
        universeCount === 1 ? "" : "s"
      }`
    );
    const playerIndex = round % 2;

    const newMap: Map<`${number}-${number}-${number}-${number}`, number> = new Map();
    for (const [key, count] of player.positionScoreCountMap.entries()) {
      const positionA = Number(key.split("-")[0]);
      const positionB = Number(key.split("-")[1]);
      const scoreA = Number(key.split("-")[2]);
      const scoreB = Number(key.split("-")[3]);
      if (scoreA >= 21) {
        const key: `${number}-${number}-${number}-${number}` = `0-0-21-0`;
        if (newMap.has(key)) {
          newMap.set(key, count + newMap.get(key)!);
        } else {
          newMap.set(key, count);
        }
        continue;
      }
      if (scoreB >= 21) {
        const key: `${number}-${number}-${number}-${number}` = `0-0-0-21`;
        if (newMap.has(key)) {
          newMap.set(key, count + newMap.get(key)!);
        } else {
          newMap.set(key, count);
        }
        continue;
      }
      const position = [positionA, positionB][playerIndex];
      const score = [scoreA, scoreB][playerIndex];
      for (let i = 3; i <= 9; i++) {
        didChange = true;
        const newCount = count * counts[i - 3];
        const newPosition = ((position + i - 1) % 10) + 1;
        const newScore = score + newPosition;
        const key: `${number}-${number}-${number}-${number}` =
          playerIndex === 0
            ? `${newPosition}-${positionB}-${newScore}-${scoreB}`
            : `${positionA}-${newPosition}-${scoreA}-${newScore}`;
        if (newMap.has(key)) {
          newMap.set(key, newCount + newMap.get(key)!);
        } else {
          newMap.set(key, newCount);
        }
      }
    }
    if (!didChange) break;
    player.positionScoreCountMap = newMap;
  }

  const sorted = [...player.positionScoreCountMap.entries()].sort((a, b) => b[1] - a[1]);

  console.log(chalk.blue`${(sorted[0][1] + sorted[1][1]).toLocaleString()} Total Universes`);
  for (let i = 0; i < 2; i++) {
    console.log(
      chalk.blue`${sorted[i][1].toLocaleString()} Universes with games won by Player ${i + 1}`
    );
  }
  console.log(chalk.green`Answer: ${sorted[0][1]}`);
}
