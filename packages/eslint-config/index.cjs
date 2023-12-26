const { defineConfig } = require('eslint-define-config')

module.exports = defineConfig({
	env: { node: true },
	parser: '@typescript-eslint/parser',
	plugins: ['turbo', 'prettier', 'simple-import-sort'],
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-type-checked',
		'plugin:@typescript-eslint/strict',
		'plugin:@typescript-eslint/strict-type-checked',
		'plugin:@typescript-eslint/stylistic',
		'plugin:@typescript-eslint/stylistic-type-checked',
	],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	rules: {
		// Base
		'object-curly-spacing': ['error', 'always'],
		quotes: ['error', 'single'],
		semi: ['error', 'never'],
		// Typescript
		'@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
		// Pretier
		'prettier/prettier': 'error',
		// Import and exports sort
		'simple-import-sort/exports': 'error',
		'simple-import-sort/imports': [
			'error',
			{
				groups: [
					['^node:', `^(${require('module').builtinModules.join('|')})(/|$)`],
					['^react', '^@?\\w'],
					['^(client|server|plugins)(/.*|$)', '^\\.', '^.+\\.css$'],
				],
			},
		],
	},
	ignorePatterns: ['dist', 'node_modules', '*.cjs'],
})
