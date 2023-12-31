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
			files: 'client/**/*',
			extends: ['@acme/eslint-config/web'],
			parserOptions: { project: ['./tsconfig.web.json'] },
			rules: {
				// Disabling using of useLayoutEffect from react
				'react-hooks/exhaustive-deps': ['warn', { additionalHooks: 'useEnhancedEffect' }],
				'no-restricted-imports': [
					'error',
					{
						name: 'react',
						importNames: ['useLayoutEffect'],
						message: '"useLayoutEffect" causes a warning in SSR. Use "useEnhancedEffect"',
					},
				],
			},
		},
	],
	ignorePatterns: ['dev-dist'],
})
