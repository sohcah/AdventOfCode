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
  // [
  //   "output",
  //   {
  //     type: "output" as const,
  //     name: "output",
  //     value: null,
  //     outputs: [],
  //   },
  // ] as const,
  [
    "rx",
    {
      type: "output" as const,
      name: "rx",
      value: null,
      outputs: [],
    },
  ] as const,
]);

const moduleInputs = new Map<string, string[]>();

for (const module of modules.values()) {
  // const newOutputs: string[] = [];
  for (const output of module.outputs) {
    if (!moduleInputs.has(output)) moduleInputs.set(output, []);
    moduleInputs.get(output)!.push(module.name);
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

for (const [module, { outputs, type }] of modules.entries()) {
  const inputs = moduleInputs.get(module);
  console.log(inputs, "->", module + ":" + type, "->", outputs);
}

// console.log(moduleInputs);

// console.log(input);
let lowCount = 0;
let highCount = 0;
let answer = -1;

// const moduleExpressions = new Map<string, string>();
//
// for (const module of modules.values()) {
//   const inputs = moduleInputs.get(module.name);
//   if (!inputs) continue;
//   console.log(module, inputs);
//   let expression: string;
//   switch (module.type) {
//     case "flipflop":
//       expression = `ff(${inputs.map((i) => `{${i}}`).join(", ")})`;
//       break;
//     case "broadcast":
//       expression = `broadcast(${inputs.map((i) => `{${i}}`).join(", ")})`;
//       break;
//     case "conjunction":
//       expression = `conj(${inputs.map((i) => `{${i}}`).join(", ")})`;
//       break;
//     case "output":
//       expression = `output(${inputs.map((i) => `${i}`).join(", ")})`;
//       break;
//     default:
//       throw new Error(`unknown type ${module.type}`);
//   }
//   moduleExpressions.set(module.name, expression);
// }
//
// for (const module of moduleExpressions.keys()) {
//   let expression = moduleExpressions.get(module)!;
//   // while (expression.includes("{")) {
//     expression = expression.replace(/{([a-z]+)}/g, (_, i) => {
//       if (i === module) return i;
//       return moduleExpressions.get(i);
//     });
//     // i++;
//   // }
//   // console.log(expression);
//   moduleExpressions.set(module, expression);
// }
// console.log([...moduleExpressions.entries()].map((i) => i.join(" = ")).join("\n"));
// console.log(moduleExpressions.get("rx"));

const lastLoops: Record<string, Set<number>> = {};

const orderedModules = new Set<string>();

outer: for (let button = 1; button <= 20000; button++) {
  if (button % 1000000 === 0) console.log(button);
  const signalQueue: [moduleName: string, inputSignal: boolean, inputModule: string][] = [];
  signalQueue.push(["button", false, ""]);

  for (let i = 0; i < signalQueue.length; i++) {
    const [moduleName, inputSignal, inputModule] = signalQueue[i]!;
    orderedModules.add(moduleName);
    if (inputModule !== "") {
      if (inputSignal) {
        highCount++;
      } else {
        lowCount++;
      }
    }
    const module = modules.get(moduleName);
    if (!module) continue;
    if (moduleName === "qn" && module.type === "conjunction") {
      for (const key in module.value) {
        if (module.value[key]) {
          lastLoops[key] ??= new Set();
          lastLoops[key].add(button);
        }
      }
      // if (Object.values(module.value).some(Boolean)) {
      //   console.log(module, button);
      // }
    }
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
        if (inputSignal === false) {
          console.log(moduleName);
          answer = i + 1;
          break outer;
        }
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

  // const state = [...orderedModules]
  //   .map((i) => modules.get(i)!)
  //   .flatMap((i) => {
  //     if (i.type === "broadcast") return [];
  //     if (i.type === "button") return [];
  //     if (i.type === "conjunction")
  //       return Object.entries(i.value)
  //         .sort((a, b) => a[0].localeCompare(b[0]))
  //         .map((i) => i[1]);
  //     return [i.value];
  //   });
  //
  // console.log(
  //   state.map((i) => (i ? 1 : 0)).join("") +
  //     (orderedModules.size === modules.size ? "" : `...${modules.size - orderedModules.size}`)
  // );

  // console.log("---");
}

console.log(lastLoops);

console.log(lowCount, highCount);

const ans = Object.values(lastLoops).map((i) => [...i][0]).product;

output(ans).forTest(11687500).forActual(241528477694627);
