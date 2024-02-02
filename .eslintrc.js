module.exports = {
	root: true,
	extends: [
		"plugin:react/recommended",
		"plugin:react-hooks/recommended",
		"eslint:recommended",
		"prettier",
		"plugin:prettier/recommended",
	],
	parser: "@typescript-eslint/parser",
	parserOptions: { ecmaVersion: 8, sourceType: "module" },
	globals: { React: true, JSX: true, window: true, module: true },
	env: { browser: true, node: true, es6: true },
	plugins: ["@typescript-eslint", "react", "react-hooks", "react-refresh", "import"],
	ignorePatterns: ["node_modules/", "dist/"],
	overrides: [
		{
			files: ["**/*.ts", "**/*.tsx"],
			parser: "@typescript-eslint/parser",
			settings: {
				react: { version: "18.2.0" },
				"import/resolver": { typescript: { alwaysTryTypes: true } },
			},
			extends: [
				"eslint:recommended",
				"plugin:import/errors",
				"plugin:import/warnings",
				"plugin:import/typescript",
				"plugin:@typescript-eslint/recommended",
				"plugin:react/recommended",
				"prettier",
				"plugin:prettier/recommended",
			],
			rules: {
				"import/order": [
					"error",
					{
						groups: ["builtin", "external", "internal", "parent", "sibling", "index", "object"],
						"newlines-between": "always",
						alphabetize: { order: "asc", caseInsensitive: true },
					},
				],
				"import/default": "off",
				"import/no-named-as-default-member": "off",
				"import/no-named-as-default": "off",
				"import/no-unresolved": [2, { commonjs: true, amd: true, ignore: ["~icons/*"] }],
				"react/jsx-key": "off",
				"react/prop-types": "off",
				"react/react-in-jsx-scope": "off",
				"react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
				"@typescript-eslint/no-unused-vars": ["error"],
				"@typescript-eslint/explicit-function-return-type": ["off"],
				"@typescript-eslint/explicit-module-boundary-types": ["off"],
				"@typescript-eslint/no-empty-function": ["off"],
				"@typescript-eslint/no-explicit-any": ["off"],
				"@typescript-eslint/no-non-null-assertion": "off",
				"prettier/prettier": [
					"error",
					{
						endOfLine: "auto",
					},
					{
						usePrettierrc: true,
					},
				],
			},
		},
	],
}
