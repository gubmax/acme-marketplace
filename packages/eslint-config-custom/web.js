module.exports = {
	root: true,
	env: { node: false, browser: true },
	extends: ['./index', 'plugin:react/recommended', 'plugin:react-hooks/recommended'],
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
}
