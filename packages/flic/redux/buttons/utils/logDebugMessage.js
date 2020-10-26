const chalk = require('chalk')
const { tap } = require('rxjs/operators')

const logDebugMessage = (
	debugMessage,
	colorReplacement,
) => (
	tap(() => {
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
					/(\|\|\|.+\|\|\|)/gm,
					chalk[colorReplacement](
						'$1'
					)
				)
			),
		)
	})
)

module.exports = logDebugMessage
