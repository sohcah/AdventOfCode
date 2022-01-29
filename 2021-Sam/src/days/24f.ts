import chalk from "chalk";
import fs from "fs";
import { Superset } from "../utils";

type Data = string[][];

function loadData(): Data {
  const lines: string[] = fs.readFileSync("./inputs/24.txt", "utf8").trim().split("\n");
  return lines.map(i => i.split(" "));
}

class InstructionController {
  expressions: {[key: string]: any} = {
    w: "0",
    x: "0",
    y: "0",
    z: "0"
  }

  index = 0;

  addInstruction(instruction: string[]) {
    const opcode = instruction[0];
    const storeKey = instruction[1];
    const a = this.expressions[instruction[1]];
    const bNumb = Number(instruction[2]);
    const b = Number.isNaN(bNumb) ? this.expressions[instruction[2]] : bNumb.toString();
    const operations: { [key: string]: () => any } = {
      inp: () => (this.index++ + 10).toString(36),
      add: () => {
        if (a === "0") return b;
        if (b === "0") return a;
        if (a.match(/^\d+$/) && b.match(/^\d+$/)) return (Number(a) + Number(b)).toString();
        if (b.startsWith("-")) {
        return `(${a}-${b.slice(1)})`;
        }
        return `(${a}+${b})`;
      },
      mul: () => {
        if (a === "0" || b === "0") return "0";
        if (a.match(/^\d+$/) && b.match(/^\d+$/)) return (Number(a) * Number(b)).toString();
        return `(${a}*${b})`;
      },
      div: () => {
        if (a.match(/^\d+$/) && b.match(/^\d+$/))
          return Math.floor(Number(a) / Number(b)).toString();
        return `Math.floor(${a}/${b})`;
      },
      mod: () => {
        if (a.match(/^\d+$/) && b.match(/^\d+$/)) return (Number(a) % Number(b)).toString();
        return `(${a}%${b})`;
      },
      eql: () => {
        if (a === b) return "1";
        return `(${a}===${b}?1:0)`;
      },
    };
    this.expressions[storeKey] = operations[opcode]();
  }
}

export function Part1() {
  const data = loadData();

  const controller = new InstructionController();

  const inputIndexes = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i][0] === "inp") {
      inputIndexes.push(i);
    }
  }
  console.log(chalk.blue`Found ${inputIndexes.length} Inputs`);

  const expr = [];
  console.log(chalk.blue.bold`Generating Expressions...`);
  for (let ind = 0; ind < inputIndexes.length; ind++) {
  console.log(
    chalk.blue`Generating Expression ${(ind + 1)
      .toString()
      .padStart(inputIndexes.length.toString().length, "0")}/${inputIndexes.length}`
  );
    for (const instruction of data.slice(inputIndexes[ind], inputIndexes[ind + 1])) {
      controller.addInstruction(instruction);
    }
    expr.push(controller.expressions.z);
    console.log(chalk.gray.italic`${controller.expressions.z}`);
    controller.expressions = {w: "w", x: "x", y: "y", z: "z"};
  }

  const expressions: ((a: number, z: number) => number)[] = eval(
    "[" +
      expr
        .map((i, n) => {
          return `(${(n+10).toString(36)}, z) => ${i}`;
        })
        .join(",") +
      "];"
  );

  const outputs: number[][] = [[0]];
  const sectionSolutionsMax: Record<number, number> = {};
  const sectionSolutionsMin: Record<number, number> = {};

  console.log(chalk.blue.bold`Solving...`)
  for (let section = 0; section < expressions.length; section++) {
    const sectionOutputs = new Superset<number>();
    const options = outputs[section].length;
    for (let i = 1; i <= 9; i++) {
      console.log(chalk.blue`Section ${(section + 1).toString().padStart((expressions.length).toString().length, "0")}/${expressions.length} - ${i}/9 - ${options.toLocaleString()} Options`);
      for (const output of outputs[section]) {
        if (output < 10000000) {
          const key = expressions[section](i, output);
          sectionOutputs.add(key);
          const solKey = key * 20 + section;
          const currentSolMin = sectionSolutionsMin[solKey] ?? 100000000000000;
          const startMin = sectionSolutionsMin[output * 20 + (section - 1)] ?? 0;
          if (startMin !== 0 || section === 0) {
            const valMin = startMin * 10 + i;
            if (valMin < currentSolMin) {
              sectionSolutionsMin[solKey] = valMin;
            }
          }

          const currentSolMax = sectionSolutionsMax[solKey] ?? 0;
          const startMax = sectionSolutionsMax[output * 20 + (section - 1)] ?? 0;
          if (startMax !== 0 || section === 0) {
            const valMax = startMax * 10 + i;
            if (valMax > currentSolMax) {
              sectionSolutionsMax[solKey] = valMax;
            }
          }
        }
      }
    }
    outputs.push([...sectionOutputs]);
  }

  console.log(chalk.green`Part 1 - Maximum: ${sectionSolutionsMax[expressions.length - 1]}`);
  console.log(chalk.green`Part 2 - Minimum: ${sectionSolutionsMin[expressions.length - 1]}`);
}

export function Part2() {
  Part1();
}