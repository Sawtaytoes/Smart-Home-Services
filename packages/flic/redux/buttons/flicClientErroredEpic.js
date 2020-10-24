const chalk = require('chalk')
const { fromEvent } = require('rxjs')
const { mapTo, mergeMap, take, tap } = require('rxjs/operators')
const { catchEpicError } = require('@redux-observable-backend/redux-utils')
const { ofType } = require('redux-observable')

const { ADDED_FLIC_CLIENT, restartFlicClient } = require('./actions')

const flicClientErroredEpic = (
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
				'error',
			)
			.pipe(
				take(1),
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
							chalk
							.redBright(hostname)
						),
						(
							'is unavailable.'
						),
					)
				}),
				mapTo(
					restartFlicClient({
						hostname,
						port,
					})
				)
			)
		)),
		catchEpicError(),
	)
)

module.exports = flicClientErroredEpic
