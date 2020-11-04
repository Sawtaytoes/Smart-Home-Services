const { catchEpicError } = require('@redux-observable-backend/redux-utils')
const { ignoreElements, mergeMap, tap } = require('rxjs/operators')
const { ofType } = require('redux-observable')

const fromFlicClientEvent = require('./utils/fromFlicClientEvent')
const logDebugMessage = require('./utils/logDebugMessage')
const { ADDED_FLIC_CLIENT } = require('./actions')

const flicClientReadyEpic = (
	action$,
) => (
	action$
	.pipe(
		ofType(ADDED_FLIC_CLIENT),
		mergeMap(({
			flicClient,
			hostname,
		}) => (
			fromFlicClientEvent({
				action$,
				eventName: 'ready',
				flicClient,
			})
			.pipe(
				tap(() => {
					logDebugMessage(
						`|||${hostname}||| is ready!`,
						'greenBright',
					)
				}),
			)
		)),
		ignoreElements(),
		catchEpicError(),
	)
)

module.exports = flicClientReadyEpic
