const { catchEpicError } = require('@redux-observable-backend/redux-utils')
const { mapTo, mergeMap, tap } = require('rxjs/operators')
const { ofType } = require('redux-observable')

const fromFlicClientEvent = require('./utils/fromFlicClientEvent')
const logDebugMessage = require('./utils/logDebugMessage')
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
			fromFlicClientEvent({
				action$,
				eventName: 'close',
				flicClient,
			})
			.pipe(
				tap(() => {
					logDebugMessage(
						`|||${hostname}||| was terminated.`,
						'greenBright',
					)
				}),
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
