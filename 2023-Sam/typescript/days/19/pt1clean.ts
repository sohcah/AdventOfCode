import { p, load, output, ResultOf } from "aocutils";

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
const category = p`${p.word("key")}=${p.num("value")}`;
const partParser = p`{${category.list(",").dict()(0)}}`;

// Overall Input
const { workflows, parts } = load(
  p`${workflow.list("\n").map((i) => {
    return new Map(i);
  })("workflows")}\n\n${partParser.list("\n")("parts")}`
);

function check(part: ResultOf<typeof partParser>, rules: ResultOf<typeof rule>[]): string {
  for (const rule of rules) {
    if (rule.type === "conditional") {
      switch (rule.operator) {
        case "<":
          if (part[rule.category] < rule.amount) {
            return rule.workflow;
          }
          break;
        case ">":
          if (part[rule.category] > rule.amount) {
            return rule.workflow;
          }
          break;
        default:
          throw `unknown operator ${rule.operator}`;
      }
    } else {
      return rule.workflow;
    }
  }
  throw new Error(`no rule match for ${rules.join(", ")}`);
}

let sum = 0;
for (const part of parts) {
  let workflow = "in";
  while (workflow !== "A" && workflow !== "R") {
    const rules = workflows.get(workflow)!;
    workflow = check(part, rules);
  }
  if (workflow === "A") {
    sum += part.x + part.m + part.a + part.s;
  }
}

output(sum).forTest(19114).forActual(373302);
