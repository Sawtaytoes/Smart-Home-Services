const { bindNodeCallback, fromEvent, merge, Observable } = require('rxjs')
const { catchEpicError } = require('@redux-observable-backend/redux-utils')
const { filter, ignoreElements, map, mergeMap, switchMap, tap } = require('rxjs/operators')
const { ofType } = require('redux-observable')

const {
	ADD_WEMO_CLIENT,
} = require('./actions')

const startWemoDeviceListenerEpic = (
	action$,
) => (
	action$
	.pipe(
		ofType(ADD_WEMO_CLIENT),
		mergeMap(({
			wemoClient,
		}) => (
			Observable
			.create((
				observer,
			) => {
				wemoClient
				.discover((
					error,
					deviceInfo,
				) => {
					observer
					.next(deviceInfo)

					observer
					.error(error)
				})
			})
			.pipe(
				filter(Boolean),
				switchMap((
					deviceInfo,
				) => (
					merge(
						(
							fromEvent(
								wemoClient.client(deviceInfo),
								'binaryState',
							)
							.pipe(
								map(value => ({
									friendlyName: deviceInfo.friendlyName,
									type: 'DEVICE_INFO',
									value: value !== '0' ? 'ON' : 'OFF',
								})),
							)
						),
						(
							fromEvent(
								wemoClient.client(deviceInfo),
								'error',
							)
							.pipe(
								map(error => ({
									error,
									friendlyName: deviceInfo.friendlyName,
									type: 'SOME_ERROR',
								})),
							)
						),
					)
				)),
			)
		)),
		tap(console.log),
		catchEpicError(),
		ignoreElements(),
	)
)

module.exports = startWemoDeviceListenerEpic
