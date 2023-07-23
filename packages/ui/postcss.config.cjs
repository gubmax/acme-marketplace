module.exports = {
	plugins: [
		require('postcss-import')({ plugins: [require('stylelint')] }),
		require('postcss-nested'),
		require('postcss-mixins'),
		require('autoprefixer'),
	],
}
