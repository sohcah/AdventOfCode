const {Stabilise} = require("aocutils");
const {readFileSync} = require("fs");
const execSync = require('child_process').execSync;
const rmSync = require('fs').rmSync;
const mkdtempSync = require('fs').mkdtempSync;
const tmpdir = require('os').tmpdir;

// execSync(`yarn workspace ${process.argv[2]} run tsc --noCheck pt${process.argv[3]}.ts`, {
//   stdio: 'inherit',
//   AOCNAME: `input${process.argv[3]}`,
// });

process.env.AOCNAME = `input${process.argv[3]}`;
process.env.AOCDAY = process.argv[2];

try {
  require(`./days/${process.argv[2]}/pt${process.argv[3]}.ts`);
} catch (e) {
  if(e instanceof Stabilise) {
    const tmpDir = mkdtempSync(`${tmpdir()}/aoc-`);
    let history = [];
    for (let n = e.value.start; n < e.value.start + e.value.increment * 50; n += e.value.increment) {
      console.log("STABILISE", n);
      const outfile = tmpDir + "/output-" + n;
      execSync(`yarn workspace ${process.argv[2]} run tsx pt${process.argv[3]}.ts`, {
        stdio: 'inherit',
        env: {
          ...process.env,
          INPUT_PREFIX: "../../",
          AOCNAME: `input${process.argv[3]}`,
          STABILISE_VALUE: n.toString(),
          OUTPUT_FILE: outfile,
        }
      });
      const result = readFileSync(outfile, "utf8");
      // require(`./days/${process.argv[2]}/pt${process.argv[3]}.ts`);
      // delete require.cache[require.resolve(`./days/${process.argv[2]}/pt${process.argv[3]}.ts`)];
      // const result = process.env.OUTPUT;
      history.push(result);

      if (history.length >= e.value.stableCount) {
        if (history.every(v => v === result)) {
          console.log(result);
          process.exit(0)
        }
        history.shift();
      }
    }
    throw new Error("No stable result found");
  }
  throw e;
}

// rmSync(`./${process.argv[2]}/pt${process.argv[3]}.js`, { force: true });
