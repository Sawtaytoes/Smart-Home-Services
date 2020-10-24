const { resolve } = require('path')

module.exports = {
	extends: [
		'@ghadyani-eslint/node',
	],
	rules: {
		'comma-dangle': [
			'warn',
			{
				arrays: 'always-multiline',
				exports: 'always-multiline',
				functions: 'only-multiline',
				imports: 'always-multiline',
				objects: 'always-multiline',
			},
		],
	},
	settings: {
		'import/resolver': {
			alias: [
				['$redux', resolve(__dirname, 'redux')],
				['$utils', resolve(__dirname, 'utils')],
			],
		},
	},
}
