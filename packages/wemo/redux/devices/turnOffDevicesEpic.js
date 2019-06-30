const { from, of } = require('rxjs')
const { catchEpicError } = require('@redux-observable-backend/redux-utils')
const { filter, map, mergeMap, pluck } = require('rxjs/operators')
const { ofType } = require('redux-observable')

const { selectDeviceClient } = require('./selectors')

const {
	setBinaryState,
	TURN_OFF_DEVICES,
} = require('./actions')

const turnOffDevicesEpic = (
	action$,
	state$,
) => (
	action$
	.pipe(
		ofType(TURN_OFF_DEVICES),
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
					)
				)),
			)
		)),
		filter(Boolean),
		map(deviceClient => ({
			binaryState: 0,
			deviceClient,
		})),
		map(setBinaryState),
		catchEpicError(),
	)
)

module.exports = turnOffDevicesEpic
