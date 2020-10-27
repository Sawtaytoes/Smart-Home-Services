const { catchEpicError } = require('@redux-observable-backend/redux-utils')
const { ignoreElements, mergeMap, take } = require('rxjs/operators')
const { fromEvent } = require('rxjs')
const { ofType } = require('redux-observable')

const logDebugMessage = require('./utils/logDebugMessage')
const takeUntilFlicClientTerminated = require('./utils/takeUntilFlicClientTerminated')
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
			fromEvent(
				flicClient,
				'ready',
			)
			.pipe(
				take(1),
				takeUntilFlicClientTerminated({
					action$,
					flicClient,
				}),
				logDebugMessage(
					`|||${hostname}||| is ready!`,
					'greenBright',
				),
			)
		)),
		ignoreElements(),
		catchEpicError(),
	)
)

module.exports = flicClientReadyEpic
