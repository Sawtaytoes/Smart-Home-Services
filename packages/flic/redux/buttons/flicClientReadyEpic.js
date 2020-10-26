const { catchEpicError } = require('@redux-observable-backend/redux-utils')
const { map, mergeMap, take } = require('rxjs/operators')
const { fromEvent } = require('rxjs')
const { ofType } = require('redux-observable')

const logDebugMessage = require('./utils/logDebugMessage')
const takeUntilFlicClientTerminated = require('./utils/takeUntilFlicClientTerminated')
const { ADDED_FLIC_CLIENT, flicClientReady } = require('./actions')

const flicClientReadyEpic = (
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
				map(({
					flicClient,
					hostname,
				}) => (
					flicClientReady({
						flicClient,
						hostname,
						port,
					})
				)),
			)
		)),
		catchEpicError(),
	)
)

module.exports = flicClientReadyEpic
