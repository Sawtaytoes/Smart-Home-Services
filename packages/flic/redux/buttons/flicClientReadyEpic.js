const chalk = require('chalk')
const { fromEvent } = require('rxjs')
const { mapTo, mergeMap, takeUntil, tap } = require('rxjs/operators')
const { catchEpicError } = require('@redux-observable-backend/redux-utils')
const { ofType } = require('redux-observable')

const { ADD_FLIC_CLIENT, flicClientReady, FLIC_CLIENT_TERMINATED } = require('./actions')
const ofFlicClient = require('./utils/ofFlicClient')

const flicClientReadyEpic = (
	action$,
) => (
	action$
	.pipe(
		ofType(ADD_FLIC_CLIENT),
		mergeMap(({
			flicClient,
			hostname,
		}) => (
			fromEvent(
				flicClient,
				'ready',
			)
			.pipe(
				takeUntil(
					action$
					.pipe(
						ofType(FLIC_CLIENT_TERMINATED),
						ofFlicClient(
							flicClient
						),
					)
				),
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
							.greenBright(hostname)
						),
						(
							'is ready!'
						),
					)
				}),
				mapTo(
					flicClientReady({
						flicClient,
						hostname,
					})
				)
			)
		)),
		catchEpicError(),
	)
)

module.exports = flicClientReadyEpic
