const chalk = require('chalk')
const { fromEvent } = require('rxjs')
const { mapTo, mergeMap, take, tap } = require('rxjs/operators')
const { catchEpicError } = require('@redux-observable-backend/redux-utils')
const { ofType } = require('redux-observable')

const { FLIC_CLIENT_READY, flicClientTerminated } = require('./actions')

const flicClientTerminatedEpic = (
	action$,
) => (
	action$
	.pipe(
		ofType(FLIC_CLIENT_READY),
		mergeMap(({
			flicClient,
			hostname,
		}) => (
			fromEvent(
				flicClient,
				'close',
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
							'was terminated!'
						),
					)
				}),
				mapTo(
					flicClientTerminated({
						flicClient,
						hostname,
					})
				)
			)
		)),
		catchEpicError(),
	)
)

module.exports = flicClientTerminatedEpic
