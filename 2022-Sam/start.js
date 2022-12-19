const execSync = require('child_process').execSync;

execSync(`yarn workspace ${process.argv[2]} run tsx pt${process.argv[3]}.ts`, {
  stdio: 'inherit',
  AOCNAME: `input${process.argv[3]}`,
});
