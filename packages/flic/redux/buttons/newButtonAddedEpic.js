const chalk = require('chalk')
const { catchEpicError } = require('@redux-observable-backend/redux-utils')
const { fromEvent } = require('rxjs')
const { mapTo, mergeMap, take, tap } = require('rxjs/operators')
const { ofType } = require('redux-observable')

const { FLIC_CLIENT_READY_FOR_RESTART, startFlicClient } = require('./actions')

const newButtonAddedEpic = (
	action$,
) => (
	action$
	.pipe(
		ofType(FLIC_CLIENT_READY_FOR_RESTART),
		mergeMap(({
			flicClient,
			hostname,
			port,
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
		catchEpicError(),
	)
)

module.exports = newButtonAddedEpic
