import { loadTrimmed, output } from "aocutils";

const monkeys = loadTrimmed()
	.split("\n\n")
	.map((i) => {
		const lines = Object.fromEntries(i.split("\n").map((i) => i.trim().split(": ")));
		const op = lines.Operation.split(" ");
		return {
			starting: lines["Starting items"].split(", ").map((i) => Number(i)),
			operation: op[3],
			argument: op[4] === "old" ? "self" : Number(op[4]),
			ifTrue: parseInt(lines["If true"].match(/(\d+)/)![1]),
			ifFalse: parseInt(lines["If false"].match(/(\d+)/)![1]),
			test: parseInt(lines["Test"].match(/(\d+)/)![1]),
		} as const;
	});

class Monkey {
	public items: number[];
	public operation: "+" | "*";
	public operationValue: number | "self";
	public ifTrue!: Monkey;
	public ifFalse!: Monkey;
	public test: number;
	public thrown = 0;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
		return this.items[item] % this.test === 0;
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

for (let round = 0; round < 20; round++) {
	console.log(`---- Round ${round} ----`);
	console.log(
		Array.from(monkeyMap.values())
			.map((i) => `${i.thrown} thrown: ${i.items.join(", ")}`)
			.join("\n")
	);
	for (const monkey of Array.from(monkeyMap.values())) {
		for (let item = 0; item < monkey.items.length; item++) {
			monkey.runOperation(item);
			monkey.items[item] = Math.floor(monkey.items[item] / 3);

			if (monkey.testItem(item)) {
				monkey.ifTrue.items.push(monkey.items[item]);
			} else {
				monkey.ifFalse.items.push(monkey.items[item]);
			}

			monkey.thrown++;
		}
		monkey.items = [];
	}
}

output(
	Array.from(monkeyMap.values())
		.map((i) => i.thrown)
		.sort((a, b) => b - a)
		.slice(0, 2).product
).forTest(10605);
