module.exports = {
	'env': {
		'browser': true,
		'es6': true,
		'node': true
	},
	'extends': ['eslint:recommended'],
	'rules': {
		'indent': [
			'warn',
			4
		],
		'quotes': [
			'warn',
			'single'
		],
		'semi': [
			'warn',
			'always'
		],
		'no-console': [
			'warn'
		],
		'comma-dangle': [
			'warn',
			'never'
		],
		'object-curly-spacing': [
			'warn',
			'always'
		]
	}
};
