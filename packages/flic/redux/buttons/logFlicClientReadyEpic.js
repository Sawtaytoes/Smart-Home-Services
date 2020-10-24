const chalk = require('chalk')
const { fromEvent } = require('rxjs')
const { ignoreElements, mergeMap, take, tap } = require('rxjs/operators')
const { catchEpicError } = require('@redux-observable-backend/redux-utils')
const { ofType } = require('redux-observable')

const { FLIC_CLIENT_READY } = require('./actions')

const logFlicClientReadyEpic = (
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
				'ready',
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
							.greenBright(hostname)
						),
						(
							'is ready!'
						),
					)
				}),
			)
		)),
		ignoreElements(),
		catchEpicError(),
	)
)

module.exports = logFlicClientReadyEpic
