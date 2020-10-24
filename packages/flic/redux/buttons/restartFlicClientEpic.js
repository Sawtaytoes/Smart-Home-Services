const chalk = require('chalk')
const { catchEpicError } = require('@redux-observable-backend/redux-utils')
const { mapTo, mergeMap, tap } = require('rxjs/operators')
const { ofType } = require('redux-observable')
const { timer } = require('rxjs')

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
				tap(() => {
					console
					.info(
						(
							chalk
							.greenBright
							.bgGreen
							.bold('[DEBUG]')
						),
						(
							'Reconnecting to'
						),
						(
							chalk
							.greenBright(hostname)
							.concat('...')
						),
					)
				}),
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
