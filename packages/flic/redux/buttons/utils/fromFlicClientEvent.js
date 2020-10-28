const { fromEvent } = require('rxjs')

const takeUntilFlicClientTerminated = require('./utils/takeUntilFlicClientTerminated')

const fromFlicClientEvent = ({
	action$,
	eventName,
	flicClient,
}) => (
	fromEvent(
		flicClient,
		eventName,
	)
	.pipe(
		takeUntilFlicClientTerminated({
			action$,
			flicClient,
		})
	)
)

module.exports = fromFlicClientEvent
