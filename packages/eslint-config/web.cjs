const { defineConfig } = require('eslint-define-config')

module.exports = defineConfig({
	env: { node: false, browser: true },
	extends: ['./index.cjs', 'plugin:react/recommended', 'plugin:react-hooks/recommended'],
	parserOptions: {
		ecmaFeatures: { jsx: true },
	},
	settings: {
		react: { version: 'detect' },
	},
	rules: {
		// Base
		'jsx-quotes': ['error', 'prefer-double'],
		// React
		'react/prop-types': 'off',
		'react/react-in-jsx-scope': 'off',
	},
})
