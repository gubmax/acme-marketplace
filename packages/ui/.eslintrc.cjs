const { defineConfig } = require('eslint-define-config')

module.exports = defineConfig({
	root: true,
	extends: ['custom/web'],
	parserOptions: {
		project: ['./tsconfig.json'],
		tsconfigRootDir: __dirname,
	},
})
