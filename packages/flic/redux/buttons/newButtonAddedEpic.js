const chalk = require('chalk')
const { catchEpicError } = require('@redux-observable-backend/redux-utils')
const { mapTo, mergeMap, take, tap } = require('rxjs/operators')
const { ofType } = require('redux-observable')

const fromFlicClientEvent = require('./utils/fromFlicClientEvent')
const logDebugMessage = require('./utils/logDebugMessage')
const { ADDED_FLIC_CLIENT, restartFlicClient } = require('./actions')

const newButtonAddedEpic = (
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
			fromFlicClientEvent({
				action$,
				eventName: 'newVerifiedButton',
				flicClient,
			})
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

module.exports = newButtonAddedEpic
