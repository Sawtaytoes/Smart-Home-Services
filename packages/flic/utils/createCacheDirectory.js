const fs = require('fs')

try {
	fs
	.mkdirSync(
		require
		.resolve('$cache')
	)
}
catch(exception) {
	if (exception.code !== 'EEXIST') {
		throw exception
	}
}
