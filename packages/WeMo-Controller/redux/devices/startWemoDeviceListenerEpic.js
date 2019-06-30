const { bindNodeCallback, fromEvent, merge, Observable } = require('rxjs')
const { catchError, filter, ignoreElements, map, mergeMap, switchMap, tap } = require('rxjs/operators')
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
		// tap(t => {
		// 	t.wemoClient
		// 	.discover(console.log)
		// }),
		mergeMap(({
			wemoClient,
		}) => (
			// bindNodeCallback(
			// 	wemoClient
			// 	.discover
			// 	.bind(wemoClient)
			// )()
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
		ignoreElements(),
	)
)

module.exports = startWemoDeviceListenerEpic
