import { p, loadLines, output } from "aocutils";

const input = loadLines(p`${p(/[?.#]+/)("seq")} ${p.num.list(",")("pattern")}`)
  .map((i) => ({
    seq: `${i.seq}?${i.seq}?${i.seq}?${i.seq}?${i.seq}`,
    pattern: [...i.pattern, ...i.pattern, ...i.pattern, ...i.pattern, ...i.pattern],
  }))
  .map((i) => ({
    seq: i.seq.replace(/\.\./g, "."),
    pattern: i.pattern,
  }));

const DEBUG = false;

function internal_getOptions(seqFull: string, patternFull: number[], seqN: number, patternN: number): number {
  if (seqFull.length - seqN === 0 && patternFull.length - patternN > 0) return 0;

  const minLength = patternFull.reduce((a, b, n) => a + (n < patternN ? 0 : b + 1), 0);

  const output: number[] = [];

  if (seqFull.length - seqN < minLength) {
    return 0;
  }

  if (DEBUG) console.log(seqN, patternN, "SEQ", seqFull.slice(seqN), "PATTERN", patternFull.slice(patternN), "MINLENGTH", minLength);
  for (let start = seqN; start <= seqFull.length - minLength; start++) {
    if (seqFull.slice(seqN, start).includes("#")) break;
    if (seqFull.slice(start, start + patternFull[patternN]).includes(".")) continue;
    if (seqFull[start + patternFull[patternN]] === "#") continue;
    if (patternFull.length - patternN === 1 && seqFull.slice(start + patternFull[patternN]).includes("#")) continue;
    output.push(start + patternFull[patternN] + 1 - seqN);
  }

  // .#.###.#.######

  if (DEBUG) console.log("OUTPUT", output);
  // if (DEBUG && pattern.length === 23) process.exit(1);

  if (patternFull.length - patternN <= 1) return output.length;

  return output.reduce((a, i) => {
    if (DEBUG && patternN < 3) console.log(patternN, a, i, output);
    if (patternFull.length - patternN > 1 && i >= seqFull.length - seqN) return a;
    return a + getOptions(seqFull, patternFull, seqN + i, patternN + 1);
  }, 0);
}

const optionsOutputs = new Map<number, number>();
function getOptions(seq: string, pattern: number[], seqN: number, patternN: number): number {
  const key = (seq.length - seqN) * 100 + (pattern.length - patternN);
  if (!optionsOutputs.has(key)) {
    const res = internal_getOptions(seq, pattern, seqN, patternN);
    optionsOutputs.set(key, res);
  }
  return optionsOutputs.get(key)!;
}

const SLICE = [0, 10000];
// const SLICE = [896, 897];
const result = input.slice(SLICE[0], SLICE[1]).map(({ seq, pattern }, n) => {
  optionsOutputs.clear();
  if (DEBUG) console.log(seq, pattern);

  const opts = getOptions(seq + (seq.endsWith(".") ? "" : "."), pattern, 0, 0);

  if (DEBUG) console.log("options", seq, pattern, opts);

  // console.log(n, "/", input.length);

  return opts;
});

output(result.sum).forTest(21).forActual(1566786613613);
