const chalk = require('chalk')
const { bindNodeCallback, from, of } = require('rxjs')
const { catchEpicError } = require('@redux-observable-backend/redux-utils')
const { filter, ignoreElements, map, mergeMap, pluck, tap } = require('rxjs/operators')
const { ofType } = require('redux-observable')

const { TOGGLE_DEVICES } = require('./actions')

const {
	selectBinaryState,
	selectDeviceClient,
} = require('./selectors')

const toggleDevicesEpic = (
	action$,
	state$,
) => (
	action$
	.pipe(
		ofType(TOGGLE_DEVICES),
		pluck('deviceNames'),
		mergeMap(deviceNames => (
			from(deviceNames)
			.pipe(
				mergeMap(deviceName => (
					of(state$.value)
					.pipe(
						map(
							selectDeviceClient({
								namespace: deviceName,
							})
						),
						tap(deviceClient => (
							!deviceClient
							? (
								console
								.warn(
									(
										chalk
										.redBright('[MISSING DEVICE]')
									),
									(
										chalk
										.bgRed(deviceName)
									)
								)
							)
							: (
								console
								.info(
									(
										chalk
										.greenBright('[TOGGLE DEVICE]')
									),
									(
										chalk
										.bgGreen(deviceName)
									)
								)
							)
						)),
						filter(Boolean),
						mergeMap(deviceClient => (
							of(state$.value)
							.pipe(
								map(
									selectBinaryState({
										namespace: deviceName,
									})
								),
								map(powerState => ({
									deviceClient,
									powerState,
								})),
							)
						))
					)
				)),
			)
		)),
		mergeMap(({
			deviceClient,
			powerState,
		}) => (
			bindNodeCallback(
				deviceClient
				.setBinaryState
				.bind(deviceClient)
			)(
				(powerState + 1) % 2
			)
		)),
		catchEpicError(),
		ignoreElements(),
	)
)

module.exports = toggleDevicesEpic
