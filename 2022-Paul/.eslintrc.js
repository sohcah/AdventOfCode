/* eslint-disable no-undef, @typescript-eslint/no-var-requires */
const rulesDirPlugin = require("eslint-plugin-rulesdir");
rulesDirPlugin.RULES_DIR = "eslint";

module.exports = {
	root: true,
	parser: "@typescript-eslint/parser",
	parserOptions: {
		project: ["./days/tsconfig.json", "./tsconfig.eslint.json"],
	},
	plugins: ["@typescript-eslint", "rulesdir"],
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/eslint-recommended",
		"plugin:@typescript-eslint/recommended",
	],
	rules: {
		"@typescript-eslint/no-non-null-assertion": 0,
    "prefer-const": "warn",
		"rulesdir/probably_not_in": "warn",
	},
  ignorePatterns: ["eslint", "node_modules", "so", "utils", "/*.ts", "/start.js", "/test.js"],
};
