import {loadTrimmed, output} from "aocutils";

const monkeys = loadTrimmed().split("\n\n").map(i => {
  const lines = Object.fromEntries(i.split("\n").map(i => i.trim().split(": ")));
  const op = lines.Operation.split(" ");
  return {
    starting: lines["Starting items"].split(", ").map(i => BigInt(i) as bigint),
    operation: op[3],
    argument: op[4] === "old" ? "self" : BigInt(op[4]) as bigint,
    ifTrue: parseInt(lines["If true"].match(/(\d+)/)![1]),
    ifFalse: parseInt(lines["If false"].match(/(\d+)/)![1]),
    test: BigInt(lines["Test"].match(/(\d+)/)![1]) as bigint,
  } as const;
});

class Monkey {
  public items: bigint[];
  public operation: "+" | "*";
  public operationValue: bigint | "self";
  public ifTrue!: Monkey;
  public ifFalse!: Monkey;
  public test: bigint;
  public thrown = 0;

  constructor(public initial: any) {
    this.items = initial.starting;
    this.operation = initial.operation;
    this.operationValue = initial.argument;
    this.test = initial.test;
  }

  public runOperation(item: number) {
    if (this.operation === "+") {
      this.items[item] += this.operationValue === "self" ? this.items[item] : this.operationValue;
    } else {
      this.items[item] *= this.operationValue === "self" ? this.items[item] : this.operationValue;
    }
  }

  public testItem(item: number) {
    // @ts-ignore
    return this.items[item] % this.test === 0n;
  }
}

const monkeyMap = new Map<number, Monkey>();

let i = 0;
for (const monkey of monkeys) {
  monkeyMap.set(i, new Monkey(monkey));
  i++;
}

for (const monkey of Array.from(monkeyMap.values())) {
  monkey.ifTrue = monkeyMap.get(monkey.initial.ifTrue)!;
  monkey.ifFalse = monkeyMap.get(monkey.initial.ifFalse)!;
}

// console.log(monkeyMap);

// @ts-ignore
const monkeyTestProduct = monkeyMap.valuesArray().map(i => i.test).reduce((a, b) => a * b, 1n);
const end = 10000;
for (let round = 0; round < end; round++) {
  for (const monkey of Array.from(monkeyMap.values())) {
    for (let item = 0; item < monkey.items.length; item++) {
      monkey.items[item] %= monkeyTestProduct;
      monkey.runOperation(item);


      if (monkey.testItem(item)) {
        monkey.ifTrue.items.push(monkey.items[item]);
      } else {
        monkey.ifFalse.items.push(monkey.items[item]);
      }

      monkey.thrown++;
    }
    monkey.items = [];
  }
  if(round % 100 === 99) console.log(`---- Round ${round} ----`);
  // if(round === end - 1) console.log(Array.from(monkeyMap.values()).map(i => `${i.thrown} thrown: ${i.items.join(", ")}`).join("\n"));
}

output(Array.from(monkeyMap.values()).map(i => i.thrown).sort((a,b)=>b-a).slice(0,2).product()).forTest(2713310158);
