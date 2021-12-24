const expressions = [
  (a: number) => (a + 9) * ((15 === a ? 1 : 0) === 0 ? 1 : 0),
  (b: number, z: number) =>
    Math.floor(z / 1) * (25 * (((z % 26) + 11 === b ? 1 : 0) === 0 ? 1 : 0) + 1) +
    (b + 1) * (((z % 26) + 11 === b ? 1 : 0) === 0 ? 1 : 0),
  (c: number, z: number) =>
    Math.floor(z / 1) * (25 * (((z % 26) + 10 === c ? 1 : 0) === 0 ? 1 : 0) + 1) +
    (c + 11) * (((z % 26) + 10 === c ? 1 : 0) === 0 ? 1 : 0),
  (d: number, z: number) =>
    Math.floor(z / 1) * (25 * (((z % 26) + 12 === d ? 1 : 0) === 0 ? 1 : 0) + 1) +
    (d + 3) * (((z % 26) + 12 === d ? 1 : 0) === 0 ? 1 : 0),
  (e: number, z: number) =>
    Math.floor(z / 26) * (25 * (((z % 26) + -11 === e ? 1 : 0) === 0 ? 1 : 0) + 1) +
    (e + 10) * (((z % 26) + -11 === e ? 1 : 0) === 0 ? 1 : 0),
  (f: number, z: number) =>
    Math.floor(z / 1) * (25 * (((z % 26) + 11 === f ? 1 : 0) === 0 ? 1 : 0) + 1) +
    (f + 5) * (((z % 26) + 11 === f ? 1 : 0) === 0 ? 1 : 0),
  (g: number, z: number) =>
    Math.floor(z / 1) * (25 * (((z % 26) + 14 === g ? 1 : 0) === 0 ? 1 : 0) + 1) +
    g * (((z % 26) + 14 === g ? 1 : 0) === 0 ? 1 : 0),
  (h: number, z: number) =>
    Math.floor(z / 26) * (25 * (((z % 26) + -6 === h ? 1 : 0) === 0 ? 1 : 0) + 1) +
    (h + 7) * (((z % 26) + -6 === h ? 1 : 0) === 0 ? 1 : 0),
  (i: number, z: number) =>
    Math.floor(z / 1) * (25 * (((z % 26) + 10 === i ? 1 : 0) === 0 ? 1 : 0) + 1) +
    (i + 9) * (((z % 26) + 10 === i ? 1 : 0) === 0 ? 1 : 0),
  (j: number, z: number) =>
    Math.floor(z / 26) * (25 * (((z % 26) + -6 === j ? 1 : 0) === 0 ? 1 : 0) + 1) +
    (j + 15) * (((z % 26) + -6 === j ? 1 : 0) === 0 ? 1 : 0),
  (k: number, z: number) =>
    Math.floor(z / 26) * (25 * (((z % 26) + -6 === k ? 1 : 0) === 0 ? 1 : 0) + 1) +
    (k + 4) * (((z % 26) + -6 === k ? 1 : 0) === 0 ? 1 : 0),
  (l: number, z: number) =>
    Math.floor(z / 26) * (25 * (((z % 26) + -16 === l ? 1 : 0) === 0 ? 1 : 0) + 1) +
    (l + 10) * (((z % 26) + -16 === l ? 1 : 0) === 0 ? 1 : 0),
  (m: number, z: number) =>
    Math.floor(z / 26) * (25 * (((z % 26) + -4 === m ? 1 : 0) === 0 ? 1 : 0) + 1) +
    (m + 4) * (((z % 26) + -4 === m ? 1 : 0) === 0 ? 1 : 0),
  (n: number, z: number) =>
    Math.floor(z / 26) * (25 * (((z % 26) + -2 === n ? 1 : 0) === 0 ? 1 : 0) + 1) +
    (n + 9) * (((z % 26) + -2 === n ? 1 : 0) === 0 ? 1 : 0),
];

export function Part1() {
  const n = "99979797878879";
  let i = 0;
  let z = 0;
  for (const expression of expressions) {
    z = expression(Number(n[i]), z);
    i++;
  }
  console.log(z);
}
