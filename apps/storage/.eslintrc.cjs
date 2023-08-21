const { defineConfig } = require('eslint-define-config')

module.exports = defineConfig({
	root: true,
	env: { node: true },
	extends: 'custom',
	parserOptions: {
		project: ['./tsconfig.json'],
		tsconfigRootDir: __dirname,
	},
})
