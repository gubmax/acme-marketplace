const { defineConfig } = require('eslint-define-config')

module.exports = {
	root: true,
	extends: ['custom'],
	parserOptions: {
		project: ['./tsconfig.json'],
		tsconfigRootDir: __dirname,
	},
	overrides: [
		{
			files: 'src/**/*',
			extends: ['custom/web'],
			parserOptions: {
				project: ['./tsconfig.web.json'],
			},
		},
	],
}
