import { p, load, output, loadLines } from "aocutils";

const input = load().groups.map((i) => i.split("\n"));

const groups = new Map<string, string[]>();

for (const line of input[0]) {
  const groupId = line.split("{")[0];
  const group = line.split("{")[1].slice(0, -1).split(",");
  groups.set(groupId, group);
}

console.log(groups);

const parts = input[1].map((i) =>
  Object.fromEntries(
    i
      .slice(1, -1)
      .split(",")
      .map((i) => i.split("=").map((i, n) => (n === 1 ? Number(i) : i)))
  )
);

console.log(parts);

function check(part: Record<string, number>, rules: string[]): string {
  for (const rule of rules) {
    if (rule.includes(":")) {
      const condition = rule.split(":")[0];
      const goto = rule.split(":")[1];
      const type = condition[0];
      const operation = condition[1];
      const number = Number(condition.slice(2));
      switch (operation) {
        case "<":
          if (part[type] < number) {
            return goto;
          }
          break;
        case ">":
          if (part[type] > number) {
            return goto;
          }
          break;
        default:
          throw `unknown operation ${operation}`;
      }
    } else {
      return rule;
    }
  }
  throw new Error(`no rule match for ${rules.join(", ")}`);
}

let sum = 0;
for (const part of parts) {
  let group = "in";
  while (group !== "A" && group !== "R") {
    const rules = groups.get(group)!;
    group = check(part, rules);
  }
  if (group === "A") {
    sum += part.x + part.m + part.a + part.s;
  }
}

output(sum).forTest(19114);
