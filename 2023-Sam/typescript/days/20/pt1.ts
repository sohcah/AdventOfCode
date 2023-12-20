import { p, load, output, loadLines } from "aocutils";

const input = loadLines().map((i) => {
  const [name, outputText] = i.split(" -> ");
  const outputs = outputText.split(", ");
  if (name.startsWith("%")) {
    return {
      type: "flipflop" as const,
      name: name.slice(1),
      value: false,
      outputs,
    };
  }
  if (name.startsWith("&")) {
    return {
      type: "conjunction" as const,
      name: name.slice(1),
      value: {} as Record<string, boolean>,
      outputs,
    };
  }
  if (name === "broadcaster") {
    return {
      type: "broadcast" as const,
      name: "broadcaster",
      outputs,
    };
  }
  throw new Error(`Unknown name ${name}`);
});

type Module =
  | (typeof input)[number]
  | {
      type: "button";
      name: string;
      // value: boolean,
      outputs: string[];
    }
  | {
      type: "output";
      name: string;
      value: boolean | null;
      outputs: string[];
    };

const modules = new Map<string, Module>([
  ...input.map((i) => [i.name, i] as const),
  [
    "button",
    {
      type: "button" as const,
      name: "button",
      // value: false,
      outputs: ["broadcaster"],
    },
  ] as const,
  [
    "output",
    {
      type: "output" as const,
      name: "output",
      value: null,
      outputs: [],
    },
  ] as const,
]);

for (const module of modules.values()) {
  // const newOutputs: string[] = [];
  for (const output of module.outputs) {
    const outputModule = modules.get(output)!;
    if (!outputModule) {
      continue;
    }
    // newOutputs.push(output);
    if (outputModule.type === "conjunction") {
      outputModule.value[module.name] = false;
    }
  }
  // module.outputs = newOutputs;
}

console.log(input);
let lowCount = 0;
let highCount = 0;

for (let i = 0; i < 1000; i++) {
  const signalQueue: [moduleName: string, inputSignal: boolean, inputModule: string][] = [];
  signalQueue.push(["button", false, ""]);

  for (let i = 0; i < signalQueue.length; i++) {
    const [moduleName, inputSignal, inputModule] = signalQueue[i]!;
    if (inputModule !== "") {
      if (inputSignal) {
        highCount++;
      } else {
        lowCount++;
      }
    }
    const module = modules.get(moduleName);
    if (!module) continue;
    // console.log(module);
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
        throw new Error(`Unknown module type ${module.type}`);
    }
    if (outputSignal !== null) {
      for (const output of module.outputs) {
        // console.log(moduleName, outputSignal ? "-high->" : "-low->", output);
        signalQueue.push([output, outputSignal, moduleName]);
      }
    }
  }

  console.log("---");
}

console.log(lowCount, highCount);

output(lowCount * highCount)
  .forTest(11687500)
  .forActual(925955316);
