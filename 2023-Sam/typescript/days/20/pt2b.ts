import { output, loadLines } from "aocutils";

const ASSERT_LOOP_ASSUMPTION = false;

function gcd(a: number, b: number) {
  if (b === 0) return a;
  return gcd(b, a % b);
}

function lcm(numbers: number[]) {
  return numbers.reduce((a, b) => (a * b) / gcd(a, b));
}

const input = loadLines().map((i) => {
  const [name, outputText] = i.split(" -> ");
  const outputs = outputText.split(", ");
  if (name.startsWith("%")) {
    return {
      type: "flipflop" as const,
      name: name.slice(1),
      value: false,
      outputs,
      inputs: [] as string[],
    };
  }
  if (name.startsWith("&")) {
    return {
      type: "conjunction" as const,
      name: name.slice(1),
      value: {} as Record<string, boolean>,
      outputs,
      inputs: [] as string[],
    };
  }
  if (name === "broadcaster") {
    return {
      type: "broadcast" as const,
      name: "broadcaster",
      outputs,
      inputs: [] as string[],
    };
  }
  throw new Error(`Unknown name ${name}`);
});

type Module =
  | (typeof input)[number]
  | {
      type: "button";
      name: string;
      outputs: string[];
      inputs: string[];
    }
  | {
      type: "output";
      name: string;
      value: boolean | null;
      outputs: string[];
      inputs: string[];
    };

const modules = new Map<string, Module>([
  ...input.map((i) => [i.name, i] as const),
  [
    "button",
    {
      type: "button" as const,
      name: "button",
      outputs: ["broadcaster"],
      inputs: [],
    },
  ] as const,
]);

for (const module of modules.values()) {
  for (const output of module.outputs) {
    const outputModule = modules.get(output)!;
    if (!outputModule) {
      modules.set(output, {
        type: "output" as const,
        name: output,
        value: null,
        outputs: [],
        inputs: [module.name],
      });
      continue;
    }
    outputModule.inputs.push(module.name);
    if (outputModule.type === "conjunction") {
      outputModule.value[module.name] = false;
    }
  }
}

const outputModule = modules.valuesArray().find((i) => i.type === "output");

if (!outputModule) throw new Error("Unable to find output module");

if (outputModule.inputs.length !== 1)
  throw new Error("Output module doesn't have exactly one input");

const lastConjunction = modules.get(outputModule.inputs[0]);

if (!lastConjunction) throw new Error("Unable to find output module input");

if (lastConjunction.type !== "conjunction")
  throw new Error("Output module is not inputted from a conjunction");

const lastLoops: Record<string, Set<number>> = Object.fromEntries(
  Object.keys(lastConjunction.value).map((i) => [i, new Set()])
);

outer: for (let button = 1; button <= 20000; button++) {
  if (button % 1000000 === 0) console.log(button);
  const signalQueue: [moduleName: string, inputSignal: boolean, inputModule: string][] = [];
  signalQueue.push(["button", false, ""]);

  for (let i = 0; i < signalQueue.length; i++) {
    const [moduleName, inputSignal, inputModule] = signalQueue[i]!;
    const module = modules.get(moduleName);
    if (!module) continue;
    if (moduleName === "qn" && module.type === "conjunction") {
      for (const key in module.value) {
        if (module.value[key]) {
          lastLoops[key].add(button);
          if (Object.values(lastLoops).every((i) => i.size >= (ASSERT_LOOP_ASSUMPTION ? 2 : 1)))
            break outer;
        }
      }
    }
    let outputSignal: boolean | null;
    switch (module.type) {
      case "flipflop": {
        if (inputSignal) {
          outputSignal = null;
        } else {
          module.value = !module.value;
          outputSignal = module.value;
        }
        break;
      }
      case "broadcast":
        outputSignal = inputSignal;
        break;
      case "button":
        outputSignal = false;
        break;
      case "conjunction":
        module.value[inputModule] = inputSignal;
        outputSignal = Object.values(module.value).some((i) => !i);
        break;
      case "output":
        outputSignal = null;
        break;
      default:
        // @ts-expect-error This shouldn't be thrown, but here anyway
        throw new Error(`Unknown module type ${module.type}`);
    }
    if (outputSignal !== null) {
      for (const output of module.outputs) {
        signalQueue.push([output, outputSignal, moduleName]);
      }
    }
  }
}

if (ASSERT_LOOP_ASSUMPTION) {
  for (const key in lastLoops) {
    const loopValues = [...lastLoops[key]];
    if (loopValues[1] !== loopValues[0] * 2) {
      throw new Error("Last conjunction does not loop with start point 0.");
    }
  }
}

const ans = lcm(Object.values(lastLoops).map((i) => [...i][0]));

output(ans).forTest(11687500).forActual(241528477694627);
