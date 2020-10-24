const { catchEpicError } = require('@redux-observable-backend/redux-utils')
const { filter, map, mergeMap, take } = require('rxjs/operators')
const { ofType } = require('redux-observable')

const { FLIC_CLIENT_READY, START_FLIC_CLIENT, flicClientReady } = require('./actions')

const flicClientReadyEpic = (
	action$,
) => (
	action$
	.pipe(
		ofType(START_FLIC_CLIENT),
		mergeMap(({
			hostname: startedFlicClientHostname,
			port,
		}) => (
			action$
			.pipe(
				ofType(FLIC_CLIENT_READY),
				filter(({
					hostname: readiedFlicClientHostname,
				}) => (
					Object.is(
						readiedFlicClientHostname,
						startedFlicClientHostname,
					)
				)),
				take(1),
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
