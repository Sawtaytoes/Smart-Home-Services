const { catchEpicError } = require('@redux-observable-backend/redux-utils')
const { distinctUntilChanged, filter, map, mergeMap } = require('rxjs/operators')
const { Observable } = require('rxjs')

const { addDevice } = require('./actions')
const { selectWemoClient } = require('./selectors')

const wemoDeviceListenerEpic = (
	action$,
	state$,
) => (
	state$
	.pipe(
		map(selectWemoClient()),
		distinctUntilChanged(),
		filter(Boolean),
		mergeMap(wemoClient => (
			Observable
			.create((
				observer,
			) => {
				wemoClient
				.discover((
					error,
					device,
				) => {
					error
					? (
						observer
						.error(error)
					)
					: (
						observer
						.next(device)
					)
				})
			})
		)),
		filter(Boolean),
		map(addDevice),
		catchEpicError(),
	)
)

module.exports = wemoDeviceListenerEpic
