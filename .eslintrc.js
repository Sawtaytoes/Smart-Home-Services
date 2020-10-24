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
}
