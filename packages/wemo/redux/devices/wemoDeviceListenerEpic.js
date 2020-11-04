const { catchEpicError } = require('@redux-observable-backend/redux-utils')
const { distinctUntilChanged, filter, map, mergeMap, tap } = require('rxjs/operators')
const { Observable } = require('rxjs')

const logDebugMessage = require('./utils/logDebugMessage')
const { addDeviceClient } = require('./actions')
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
			.pipe(
				filter(Boolean),
				tap(({
					friendlyName,
				}) => {
					logDebugMessage(
						`|||${friendlyName}||| is ready.`,
						'greenBright',
					)
				}),
				map(device => (
					wemoClient
					.client(device)
				)),
			)
		)),
		map(addDeviceClient),
		catchEpicError(),
	)
)

module.exports = wemoDeviceListenerEpic
