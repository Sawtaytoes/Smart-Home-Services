const { fromEvent } = require('rxjs')
const { mapTo, mergeMap, take } = require('rxjs/operators')
const { catchEpicError } = require('@redux-observable-backend/redux-utils')
const { ofType } = require('redux-observable')

const logDebugMessage = require('./utils/logDebugMessage')
const takeUntilFlicClientTerminated = require('./utils/takeUntilFlicClientTerminated')
const { ADDED_FLIC_CLIENT, restartFlicClient } = require('./actions')

const flicClientTerminatedEpic = (
	action$,
) => (
	action$
	.pipe(
		ofType(ADDED_FLIC_CLIENT),
		mergeMap(({
			flicClient,
			hostname,
			port,
		}) => (
			fromEvent(
				flicClient,
				'close',
			)
			.pipe(
				take(1),
				takeUntilFlicClientTerminated({
					action$,
					flicClient,
				}),
				logDebugMessage(
					`|||${hostname}||| was terminated.`,
					'greenBright',
				),
				mapTo(
					restartFlicClient({
						flicClient,
						hostname,
						port,
					})
				)
			)
		)),
		catchEpicError(),
	)
)

module.exports = flicClientTerminatedEpic
