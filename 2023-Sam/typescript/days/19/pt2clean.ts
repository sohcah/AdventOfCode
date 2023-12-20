import { p, load, output } from "aocutils";

// Workflows
const rule = p([
  p`${p.word("category")}${p(/[<>]/)("operator")}${p.num("amount")}:${p.word("workflow")}`.map(
    (i) => ({
      type: "conditional" as const,
      ...i,
    })
  ),
  p.word.map((i) => ({ type: "direct" as const, workflow: i })),
]);
const workflow = p`${p.word(0)}{${rule.list(",")(1)}}`;

// Parts
const category = p`${p.word("category")}=${p.num("value")}`;
const part = p`{${category.list(",")(0)}}`;

// Overall Input
const { workflows } = load(
  p`${workflow.list("\n").map((i) => {
    return new Map(i);
  })("workflows")}\n\n${part.list("\n")("parts")}`
);

type Requirement = Record<string, [number, number]>;

const acceptRequirements: Requirement[] = [];

function mergeRequirements(
  requirementsA: Record<string, [number, number]>,
  requirementsB: Record<string, [number, number]>
) {
  const requirements = { ...requirementsA };
  for (const key in requirementsB) {
    if (requirements[key]) {
      requirements[key] = [
        Math.max(requirements[key][0], requirementsB[key][0]),
        Math.min(requirements[key][1], requirementsB[key][1]),
      ];
    } else {
      requirements[key] = requirementsB[key];
    }
  }
  return requirements;
}

function isImpossible(requirements: Record<string, [number, number]>) {
  return Object.values(requirements).some((i) => i[1] < i[0]);
}

function process(workflow: string, requirements: Record<string, [number, number]>) {
  if (workflow === "R") return;
  if (workflow === "A") {
    acceptRequirements.push(requirements);
    return;
  }
  const rules = workflows.get(workflow)!;
  let r = { ...requirements };
  for (const rule of rules) {
    if (isImpossible(r)) break;
    if (rule.type === "conditional") {
      switch (rule.operator) {
        case "<":
          process(rule.workflow, mergeRequirements(r, { [rule.category]: [0, rule.amount - 1] }));
          r = mergeRequirements(r, { [rule.category]: [rule.amount, 4000] });
          break;
        case ">":
          process(
            rule.workflow,
            mergeRequirements(r, { [rule.category]: [rule.amount + 1, 4000] })
          );
          r = mergeRequirements(r, { [rule.category]: [1, rule.amount] });
          break;
        default:
          throw `unknown operator ${rule.operator}`;
      }
    } else {
      process(rule.workflow, r);
      break;
    }
  }
}

process("in", { s: [1, 4000], a: [1, 4000], x: [1, 4000], m: [1, 4000] });

function range(n: [number, number]) {
  return Math.max(0, n[1] - n[0] + 1);
}

function sumGroup(group: Record<string, [number, number]>) {
  return range(group.x) * range(group.m) * range(group.a) * range(group.s);
}

const sum = acceptRequirements.reduce((a, b) => a + sumGroup(b), 0);

output(sum).forTest(167409079868000).forActual(130262715574114);
