const chalk = require('chalk')
const { catchEpicError } = require('@redux-observable-backend/redux-utils')
const { fromEvent } = require('rxjs')
const { ignoreElements, mergeMap, take, tap } = require('rxjs/operators')
const { ofType } = require('redux-observable')

const { FLIC_CLIENT_ADDED } = require('./actions')

const newButtonAddedEpic = (
	action$,
) => (
	action$
	.pipe(
		ofType(FLIC_CLIENT_ADDED),
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
				tap(() => {
					flicClient
					.close()
				}),
			)
		)),
		ignoreElements(),
		catchEpicError(),
	)
)

module.exports = newButtonAddedEpic
