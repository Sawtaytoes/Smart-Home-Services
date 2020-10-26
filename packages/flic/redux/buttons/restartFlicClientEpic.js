const { catchEpicError } = require('@redux-observable-backend/redux-utils')
const { mapTo, mergeMap } = require('rxjs/operators')
const { ofType } = require('redux-observable')
const { timer } = require('rxjs')

const logDebugMessage = require('./utils/logDebugMessage')
const { RESTART_FLIC_CLIENT, startFlicClient } = require('./actions')

const restartFlicClientEpic = (
	action$,
) => (
	action$
	.pipe(
		ofType(RESTART_FLIC_CLIENT),
		mergeMap(({
			hostname,
			port,
		}) => (
			timer(5000)
			.pipe(
				logDebugMessage(
					`Reconnecting to |||${hostname}|||...`,
					'greenBright',
				),
				mapTo(
					startFlicClient({
						hostname,
						port,
					})
				)
			)
		)),
		catchEpicError(),
	)
)

module.exports = restartFlicClientEpic
