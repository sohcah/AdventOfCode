import fs from "fs";
import chalk from "chalk";

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
  }

  run() {
    this.alu.values[this.storeKey] = this.execute();
  }
}

class ALU {
  cache: Map<string, { [key: string]: number }> = new Map();
  stepCache: Map<string, { [key: string]: number }> = new Map();
  values: { [key: string]: number } = {
    w: 0,
    x: 0,
    y: 0,
    z: 0,
  };

  inputs: string;
  index = 0;

  constructor(inputs: string) {
    this.inputs = inputs;
  }

  getInput() {
    if (this.index < 13 && this.index > 0) {
      const i = this.inputs.slice(0, this.index);
      if (!this.cache.has(i)) this.cache.set(i, { ...this.values });
    }
    return Number(this.inputs[this.index++]);
  }

  value(key: string) {
    if (!key.match(/[w-z]/g)) {
      return Number(key)
    }
    return this.values[key];
  }
  
  reset(inputs?: string) {
    this.values = {
      w: 0,
      x: 0,
      y: 0,
      z: 0,
    }
    if (inputs) {
      this.inputs = inputs;
    }
    let skip = 0;
    for (let i = 13; i >= 1; i--) {
      if (this.cache.has(this.inputs.slice(0, i))) {
        this.values = { ...this.cache.get(this.inputs.slice(0, i))! };
        skip = i;
        break;
      }
    }
    this.index = skip;
    return skip;
  }
}

export function Part1() {
  const data = loadData();

  const alu = new ALU("13579246899999");

  let max: [number, typeof alu.values] = [0, {}];

  const instructions = data.map(i => new Instruction(i, alu));

  const inputIndexes = [];
  for (let i = 0; i < instructions.length; i++) {
    if (instructions[i].opcode === "inp") {
      inputIndexes.push(i);
    }
  }

  for (let modelNumber = 10 ** 14; modelNumber > 0; modelNumber--) {
    if (modelNumber.toString().includes("0")) continue;
    if (modelNumber % 10000000 === 1111111) {
      alu.cache = new Map();
      console.log(modelNumber, alu.values, alu.cache.size);
      // break
    }
    const skip = alu.reset(modelNumber.toString());
    if (skip < 5) console.log("NOT SKIPPING", modelNumber);
    // if (skip) {
    //   console.log(skip, alu.inputs, alu.index, alu.values, inputIndexes[skip], instructions[inputIndexes[skip]]);
    //   // break;
    // }
    for (const instruction of instructions.slice(inputIndexes[skip])) {
      instruction.run();
      // console.log(alu.index, alu.values);
    }
    if (alu.values.z === 0) {
      max = [modelNumber, alu.values];
      break;
    }
  }

  console.log(alu, max);
  console.log(chalk.blue.bold`Answer: ${alu.values.w}`);
}
