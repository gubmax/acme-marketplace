module.exports = {
	plugins: [
		require('postcss-import')({ plugins: [require('stylelint')] }),
		require('postcss-nested'),
		require('postcss-simple-vars'),
		require('postcss-mixins'),
		require('autoprefixer'),
	],
}
