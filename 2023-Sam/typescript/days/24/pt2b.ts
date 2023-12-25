// This one only works in Node.js
import { output, loadLines } from "aocutils";

// process.versions.node = undefined!;
// globalThis.window = {};
// import initZ3 from "z3-solver/build/z3-built";
// globalThis.initZ3 = initZ3;
import { init } from "z3-solver";

const { Context } = await init();
const { Solver, Real } = Context("main");

const x = Real.const("x");
const y = Real.const("y");
const z = Real.const("z");
const dx = Real.const("dx");
const dy = Real.const("dy");
const dz = Real.const("dz");

const solver = new Solver();
solver.add(x.ge(0));
solver.add(y.ge(0));
solver.add(z.ge(0));

const lines = loadLines();
const input = lines.map((line) => {
  const split = line
    .replace(/\s+/g, "")
    .split("@")
    .map((i) => i.split(",").map((i) => +i));

  return {
    x: split[0][0],
    y: split[0][1],
    z: split[0][2],
    dx: split[1][0],
    dy: split[1][1],
    dz: split[1][2],
  };
});

let n = 0;
for (const line of input.slice(0, 3)) {
  n++;
  const t = Real.const(`t_${n}`);
  solver.add(t.ge(Real.val(0)));
  solver.add(
    t
      .mul(line.dx)
      .add(line.x)
      .eq(x.add(dx.mul(t)))
  );
  solver.add(
    t
      .mul(line.dy)
      .add(line.y)
      .eq(y.add(dy.mul(t)))
  );
  solver.add(
    t
      .mul(line.dz) //Real.const(`dy_${n}`)
      .add(line.z)
      .eq(z.add(dz.mul(t)))
  );
}

const start = performance.now();
console.log(solver.toString());
await solver.check();
console.log(performance.now() - start);
console.log([...solver.assertions().entries()].map((i) => i[1].toString()).join("\n"));


const m = solver.model();
// console.log(m.toString());
const ans =
  Number(m.eval(x).toString()) + Number(m.eval(y).toString()) + Number(m.eval(z).toString());

output(ans).forTest(47).forActual(618534564836937);
