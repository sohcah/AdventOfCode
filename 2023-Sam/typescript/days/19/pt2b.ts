import { load, output } from "aocutils";

const input = load().groups.map((i) => i.split("\n"));

const groups = new Map<string, string[]>();

for (const line of input[0]) {
  const groupId = line.split("{")[0];
  const group = line.split("{")[1].slice(0, -1).split(",");
  groups.set(groupId, group);
}

const groupRequirements: Record<string, Record<string, [number, number]>[]> = {};

function combineRequirements(
  requirements: Record<string, [number, number]>,
  newRequirements: Record<string, [number, number]>
) {
  const n = { ...requirements };
  for (const key in newRequirements) {
    if (n[key]) {
      n[key] = [
        Math.max(n[key][0], newRequirements[key][0]),
        Math.min(n[key][1], newRequirements[key][1]),
      ];
    } else {
      n[key] = newRequirements[key];
    }
  }
  return n;
}

function isImpossible(requirements: Record<string, [number, number]>) {
  return Object.values(requirements).some((i) => i[1] < i[0]);
}

function process(group: string, requirements: Record<string, [number, number]>) {
  if (group === "A" || group === "R") {
    groupRequirements[group] ??= [];
    groupRequirements[group].push(requirements);
    return;
  }
  const rules = groups.get(group)!;
  let r = { ...requirements };
  for (const rule of rules) {
    if (isImpossible(r)) break;
    if (rule.includes(":")) {
      const condition = rule.split(":")[0];
      const goto = rule.split(":")[1];
      const type = condition[0];
      const operation = condition[1];
      const number = Number(condition.slice(2));
      switch (operation) {
        case "<":
          process(goto, combineRequirements(r, { [type]: [0, number - 1] }));
          r = combineRequirements(r, { [type]: [number, 4000] });
          break;
        case ">":
          process(goto, combineRequirements(r, { [type]: [number + 1, 4000] }));
          r = combineRequirements(r, { [type]: [1, number] });
          break;
        default:
          throw `unknown operation ${operation}`;
      }
    } else {
      process(rule, r);
      break;
    }
  }
}

process("in", { s: [1, 4000], a: [1, 4000], x: [1, 4000], m: [1, 4000] });

function range(n: [number, number]) {
  return Math.max(0, n[1] - n[0] + 1);
}

function sumGroup(group: Record<string, [number, number]>) {
  return range(group.s) * range(group.x) * range(group.a) * range(group.m);
}

const ASum = groupRequirements["A"].reduce((a, b) => a + sumGroup(b), 0);

output(ASum).forTest(167409079868000).forActual(130262715574114);
