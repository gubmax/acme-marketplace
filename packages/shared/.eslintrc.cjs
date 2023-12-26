const { defineConfig } = require('eslint-define-config')

module.exports = defineConfig({
	root: true,
	extends: ['@acme/eslint-config'],
	parserOptions: {
		project: ['./tsconfig.json'],
		tsconfigRootDir: __dirname,
	},
})
