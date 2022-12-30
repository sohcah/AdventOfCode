import { loadLines, output } from "aocutils";

// eslint-disable-next-line prettier/prettier
output(loadLines().reduce((sum, line) => ((cc: number) => sum + cc - (cc >= 97 ? 96 : 38))(Array.from(new Set(line.slice(0, line.length / 2)).intersection(new Set(line.slice(line.length / 2))))[0].charCodeAt(0)), 0)).forTest(157);

/*
// Explanation
output(
  loadLines() // <-- Load Lines
  .reduce(
    (sum, line) =>
      ((cc: number) => sum + cc - (cc >= 97 ? 96 : 38))( // <-- Calculate Score and Sum
        Array.from( // <-- Detect Duplicate
          new Set(line.slice(0, line.length / 2)) // <-- Left Side
            .intersection(new Set(line.slice(line.length / 2))) // <-- Right Side
        )[0].charCodeAt(0)
      ),
    0
  )
).forTest(157);
 */
