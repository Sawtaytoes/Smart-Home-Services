const { fromEvent } = require('rxjs')

const takeUntilFlicClientTerminated = require('./takeUntilFlicClientTerminated')

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
