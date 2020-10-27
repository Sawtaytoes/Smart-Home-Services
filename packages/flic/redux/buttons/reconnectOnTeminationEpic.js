const { catchEpicError } = require('@redux-observable-backend/redux-utils')
const { fromEvent } = require('rxjs')
const { mapTo, mergeMap, take } = require('rxjs/operators')
const { ofType } = require('redux-observable')

const { FLIC_CLIENT_ADDED, restartFlicClient } = require('./actions')

const reconnectOnTeminationEpic = (
	action$,
) => (
	action$
	.pipe(
		ofType(FLIC_CLIENT_ADDED),
		mergeMap(({
			flicClient,
			hostname,
			port,
		}) => (
			fromEvent(
				flicClient,
				'close',
			)
			.pipe(
				take(1),
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

module.exports = reconnectOnTeminationEpic
