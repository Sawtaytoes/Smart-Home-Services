const chalk = require('chalk')

const logDebugMessage = (
	debugMessage,
	colorReplacement,
) => (
	console
	.info(
		(
			chalk
			.greenBright
			.bgGreen
			.bold('[Debug]')
		),
		(
			debugMessage
			.replace(
				/\|\|\|(.+)\|\|\|/gm,
				chalk[colorReplacement](
					'$1'
				)
			)
		),
	)
)

module.exports = logDebugMessage
