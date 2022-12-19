const execSync = require('child_process').execSync;

execSync(`yarn workspace ${process.argv[2]} run tsx pt${process.argv[3]}.ts`, {
  stdio: 'inherit', env: {
    ...process.env,
    AOCTEST: true,
    AOCNAME: `test${process.argv[3]}`,
  }
});
