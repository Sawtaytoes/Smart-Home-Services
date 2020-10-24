const chalk = require('chalk')
const { fromEvent } = require('rxjs')
const { filter, mapTo, mergeMap, take, tap } = require('rxjs/operators')
const { catchEpicError } = require('@redux-observable-backend/redux-utils')
const { ofType } = require('redux-observable')

const { FLIC_CLIENT_READY, START_FLIC_CLIENT, startFlicClient } = require('./actions')

const newButtonAddedEpic = (
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
				mergeMap(({
					flicClient,
					hostname,
				}) => (
					fromEvent(
						flicClient,
						'newVerifiedButton',
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
									'has a new Flic button.'
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
			)
		)),
		catchEpicError(),
	)
)

module.exports = newButtonAddedEpic
