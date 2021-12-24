import fs from "fs";
// import chalk from "chalk";

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

  getInput() {
    return ((this.index++) + 10).toString(36);
  }

  addInstruction(instruction: string[]) {
    const opcode = instruction[0];
    const storeKey = instruction[1];
    const a = this.expressions[instruction[1]];
    const bNumb = Number(instruction[2]);
    const b = Number.isNaN(bNumb) ? this.expressions[instruction[2]] : bNumb.toString();
    const executes: { [key: string]: () => any } = {
      inp: () => this.getInput().toString(),
      add: () => {
        if (a === "0") return b;
        if (b === "0") return a;
        if (a.match(/^\d+$/) && b.match(/^\d+$/)) return (Number(a) + Number(b)).toString();
        return `(${a}+${b})`
      },
      mul: () => {
        if (a === "0" || b === "0") return "0";
        if (a.match(/^\d+$/) && b.match(/^\d+$/)) return (Number(a) * Number(b)).toString();
        return `(${a}*${b})`
      },
      div: () => { 
        if (a.match(/^\d+$/) && b.match(/^\d+$/)) return Math.floor(Number(a) / Number(b)).toString();
        return `Math.floor(${a}/${b})`;
      },
      mod: () => {
        if (a.match(/^\d+$/) && b.match(/^\d+$/)) return (Number(a) % Number(b)).toString();
        return `(${a}%${b})`
      },
      eql: () => {
        if (a === b) return "1";
        // if (a === "0") return `!${b}`;
        // if (b === "0") return `!${a}`;
        return `( ${a}===${b} ? 1 : 0 )`
      },
    };
    this.expressions[storeKey] = this.fix(executes[opcode]());
  }

  fix(expr: string) {
    return expr;
    // while (true) {
    //   const nextExpr = expr
    //     .replace(/\((\d+)\*(\d+)\)/g, (_, a, b) => (Number(a) * Number(b)).toString())
    //     .replace(/\((\d+)\+(\d+)\)/g, (_, a, b) => (Number(a) + Number(b)).toString())
    //     .replace(/\((\d+)\/(\d+)\)/g, (_, a, b) => Math.floor(Number(a) / Number(b)).toString())
    //     .replace(/\((\d+)\%(\d+)\)/g, (_, a, b) => (Number(a) % Number(b)).toString());
    //   if (nextExpr === expr) {
    //     return expr;
    //   }
    //   expr = nextExpr
    // }
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

  let i = 0;
  const expr = [];
  for (let ind = 0; ind < inputIndexes.length; ind++) {
    for (const instruction of data.slice(inputIndexes[ind], inputIndexes[ind + 1])) {
      controller.addInstruction(instruction);
      console.log(++i);
    }
    expr.push(controller.expressions.z);
    controller.expressions = {
      w: "w",
      x: "x",
      y: "y",
      z: "z"
    }
  }

  fs.writeFileSync(
    "./outputs/24.js",
    expr
      .map((i, n) => {
        if (n === 0) {
          return `let z = ${i};`;
        }
        return `z = ${i};`;
      })
      .join("\n") + "\nz;"
  );
  fs.writeFileSync(
    "./outputs/24-func.js",
    "const expressions = [" +
      expr
        .map((i, n) => {
          return `(a, z) => ${i}`;
        })
        .join(",") +
      "];"
  );
  fs.writeFileSync(
    "./outputs/24-func.ts",
    "const expressions = [\n" +
      expr
        .map((i, n) => {
          return `  (${(n + 10).toString(36)}: number${n === 0 ? "" : ", z: number"}) => ${i}`;
        })
        .join(",\n") +
      "\n];"
  );
}
