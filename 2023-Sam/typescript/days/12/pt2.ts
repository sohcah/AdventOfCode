import { p, loadLines, output, cached, SMap } from "aocutils";

const input = loadLines(p`${p(/[?.#]+/)("seq")} ${p.num.list(",")("pattern")}`)
  .map((i) => ({
    seq: `${i.seq}?${i.seq}?${i.seq}?${i.seq}?${i.seq}`,
    pattern: [...i.pattern, ...i.pattern, ...i.pattern, ...i.pattern, ...i.pattern],
  }))
  .map((i) => ({
    seq: i.seq.replace(/\.\./g, "."),
    pattern: i.pattern,
  }));

// console.log(input);

const DEBUG = false;

function internal_getOptions(seq: string, pattern: number[]): number {
  if (seq.length === 0 && pattern.length > 0) return 0;

  // if (pattern.length === 1) {
  //     return new Array(seq.matchAllOverlapping(new RegExp(`[#?]{${pattern[0]}}`)).length).fill(0);
  // }

  const minLength = pattern.reduce((a, b) => a + b + 1, 0);

  const output: number[] = [];

  if (seq.length < minLength) {
    return 0;
  }

  if (DEBUG) console.log("SEQ", seq, "PATTERN", pattern, "MINLENGTH", minLength);
  for (let start = 0; start <= seq.length - minLength; start++) {
    // if (DEBUG) console.log("START", start);
    if (seq.slice(start, start + pattern[0]).includes(".")) continue;
    if (seq.slice(0, start).includes("#")) continue;
    if (seq[start + pattern[0]] === "#") continue;
    if (pattern.length === 1 && seq.slice(start + pattern[0]).includes("#")) continue;
    output.push(start + pattern[0] + 1);
  }

  if (DEBUG) console.log("OUTPUT", output);
  // if (DEBUG && pattern.length === 23) process.exit(1);

  if (pattern.length <= 1) return output.length;

  return output.reduce((a, i) => {
    if (pattern.length === 24) console.log(a, i);
    if (pattern.length > 1 && i >= seq.length) return a;
    return a + getOptions(seq.slice(i), pattern.slice(1));
  }, 0);
}

const optionsOutputs = new Map<number, number>();
function getOptions(seq: string, pattern: number[]): number {
  const key = seq.length * 100 + pattern.length;
  if (!optionsOutputs.get(key)) {
    const res = internal_getOptions(seq, pattern);
    optionsOutputs.set(key, res);
    if (res === 0) {
      for (let k = key - 100; k > 0; k -= 100) {
        optionsOutputs.set(key, res);
      }
    }
  }
  return optionsOutputs.get(key)!;
}

const SLICE = [0, 1000];
const result = input.slice(SLICE[0], SLICE[1]).map(({ seq, pattern }, n) => {
  optionsOutputs.clear();
  if (DEBUG) console.log(seq, pattern);
  // const options = [""];

  // const sp = seq.split(/\.+/g).filter(Boolean);
  // let minLength = 0;
  // for (const p of pattern) {
  //   minLength += p + 1;
  // }
  //   if (DEBUG) console.log(minLength);

  const opts = getOptions(seq + ".", pattern);

  if (DEBUG) console.log("options", opts);

  // console.log(sp);

  // for (const char of seq) {
  //   if (char === "?") {
  //     options = options.flatMap((i) => [`${i}#`, `${i}.`]);
  //   } else {
  //     options = options.map((i) => `${i}${char}`);
  //   }
  // }
  console.log(n, "/", input.length);
  // console.log(options);

  // const exp = [
  //   ...
  // ].slice(SLICE[0])[n];
  // if (opts !== exp) {
  //   console.log("MISMATCH", exp, opts, seq, pattern);
  // }

  return opts;
});

output(result.sum).forTest(21).forActual(1566786613613);
