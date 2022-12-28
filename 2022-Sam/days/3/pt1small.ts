import "aocutils";

const sum = load().lns.r(0, (sum, line) => {
  const compA = line.slice(0, line.length / 2).charSet;
  const compB = line.slice(line.length / 2).charSet;
  const duplicate = compA.intersection(compB).array[0];
  if (duplicate.toUpperCase() === duplicate) {
    return sum + duplicate.charCodeAt(0) - 38;
  }
  return sum + duplicate.charCodeAt(0) - 96;
});

output(sum).forTest(157).forActual(8072);
