/* eslint-disable no-undef, @typescript-eslint/no-var-requires */
const rulesDirPlugin = require("eslint-plugin-rulesdir");
rulesDirPlugin.RULES_DIR = "eslint";

module.exports = {
	root: true,
	parser: "@typescript-eslint/parser",
	parserOptions: {
		project: ["./tsconfig.json", "./tsconfig.eslint.json"],
	},
	plugins: ["@typescript-eslint", "prettier", "rulesdir"],
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/eslint-recommended",
		"plugin:@typescript-eslint/recommended",
		"prettier",
	],
	rules: {
		"prettier/prettier": 1,
		"@typescript-eslint/no-non-null-assertion": 0,
		"rulesdir/probably_not_in": "warn",
	},
	ignorePatterns: ["eslint", "node_modules", "so", "utils", "/*.ts"],
};
