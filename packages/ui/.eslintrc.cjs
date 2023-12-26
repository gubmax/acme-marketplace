const { defineConfig } = require('eslint-define-config')

module.exports = defineConfig({
	root: true,
	extends: ['@acme/eslint-config'],
	parserOptions: {
		project: ['./tsconfig.json'],
		tsconfigRootDir: __dirname,
	},
	overrides: [
		{
			files: 'src/**/*',
			extends: ['@acme/eslint-config/web'],
			parserOptions: {
				project: ['./tsconfig.web.json'],
			},
		},
		{
			files: 'src/**/*.stories.tsx',
			rules: { 'react-hooks/rules-of-hooks': 'off' },
		},
	],
	ignorePatterns: ['storybook-static'],
})
