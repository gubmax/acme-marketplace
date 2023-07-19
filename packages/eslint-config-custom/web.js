module.exports = {
	root: true,
	env: { browser: true },
	extends: ['./index.js', 'plugin:react/recommended', 'plugin:react-hooks/recommended'],
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
