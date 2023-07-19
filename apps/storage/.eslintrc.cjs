module.exports = {
	root: true,
	env: { node: true },
	extends: 'custom',
	parserOptions: {
		project: ['./tsconfig.json'],
		tsconfigRootDir: __dirname,
	},
}
