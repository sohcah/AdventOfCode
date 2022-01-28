import fs from "fs";
import chalk from "chalk";
import { Superset } from "../utils";

type Data = string[][];

function loadData(): Data {
  const lines: string[] = fs.readFileSync("./inputs/24.txt", "utf8").trim().split("\n");
  return lines.map(i => i.split(" "));
}

class Instruction {
  opcode: string;
  storeKey: string;
  a: () => number;
  b: () => number;
  alu: ALU;
  execute: () => number;
  text: string;

  constructor(instruction: string[], alu: ALU) {
    this.opcode = instruction[0];
    this.storeKey = instruction[1];
    this.a = () => alu.values[instruction[1]];
    const bNumb = Number(instruction[2]);
    this.b = Number.isNaN(Number(instruction[2])) ? (() => alu.values[instruction[2]]) : (() => bNumb);
    this.alu = alu;
    const executes: { [key: string]: () => number } = {
      inp: () => this.alu.getInput(),
      add: () => this.a() + this.b(),
      mul: () => this.a() * this.b(),
      div: () => Math.floor(this.a() / this.b()),
      mod: () => this.a() % this.b(),
      eql: () => this.a() === this.b() ? 1 : 0,
    };
    this.execute = executes[instruction[0]];
    this.text = instruction.join(" ")
  }

  run() {
    this.alu.values[this.storeKey] = this.execute();
  }
}

class ALU {
  values: { [key: string]: number } = {
    w: 0,
    x: 0,
    y: 0,
    z: 0,
  };

  input: number;

  constructor(input: number) {
    this.input = input;
  }

  getInput() {
    return this.input;
  }
}

export function Part1() {
  const data = loadData();

  const alu = new ALU(0);

  const instructions = data.map(i => new Instruction(i, alu));

  const inputIndexes = [];
  for (let i = 0; i < instructions.length; i++) {
    if (instructions[i].opcode === "inp") {
      inputIndexes.push(i);
    }
  }

  const outputs: number[][] = [
    [0],
  ]
  const sectionSolutions: Record<string, string> = {};

  for (let section = 0; section < 14; section++) {
    const sectionOutputs = new Superset<number>();
    const sectionInstructions = instructions.slice(inputIndexes[section], inputIndexes[section + 1]);
    // console.log(section, inputIndexes, outputs[section], sectionInstructions.map(i => i.text));
    console.log(section, outputs[section].length);
    for (let i = 9; i > 0; i--) {
      alu.input = i;
      for (const output of outputs[section]) {
        // alu.index = section;
        alu.values.z = output;
        // alu.values = { w: 0, x: 0, y: 0, z: output };
        for (let instruction of sectionInstructions) {
          instruction.run();
        }
        const key = alu.values.z;
        // if (!sectionOutputs.has(key)) {
          sectionOutputs.add(key);
          // const originalKey = `${output.w}|${output.x}|${output.y}|${output.z}`;
        const solKey = `${key}-${section}`;
        const currentSol = Number(sectionSolutions[solKey] ?? 0);
        const val = (sectionSolutions[`${key}-${section - 1}`] ?? "") + `${i}`;
        if (Number(val) > currentSol) {
          sectionSolutions[solKey] = val;
        }
        // }
      }
    }
    // console.log(sectionInstructions, outputs);
    outputs.push([...sectionOutputs]);
  }

  console.log(outputs);
  fs.writeFileSync("./outputs/24b.json", JSON.stringify(sectionSolutions));
  console.log(sectionSolutions["0-13"]);
  console.log(chalk.blue.bold`Answer: ${alu.values.w}`);
}
