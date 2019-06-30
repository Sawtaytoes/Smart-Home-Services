const { catchEpicError } = require('@redux-observable-backend/redux-utils')
const { groupBy, map, mergeMap, pluck, toArray } = require('rxjs/operators')
const { from, of } = require('rxjs')
const { ofType } = require('redux-observable')

const {
	TOGGLE_DEVICES,
	turnOffDevices,
	turnOnDevices,
} = require('./actions')

const { selectBinaryState } = require('./selectors')

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
							selectBinaryState({
								namespace: deviceName,
							})
						),
						map(binaryState => ({
							binaryState,
							deviceName,
						}))
					)
				)),
				groupBy(({
					binaryState,
				}) => (
					binaryState
				)),
				mergeMap(groupedDevices$ => (
					groupedDevices$
					.pipe(
						toArray(),
					)
				)),
			)
		)),
		mergeMap(groupedDevices => (
			from(groupedDevices)
			.pipe(
				pluck('deviceName'),
				toArray(),
				map(deviceNames => ({
					binaryState: groupedDevices[0].binaryState,
					deviceNames,
				})),
			)
		)),
		map(({
			binaryState,
			deviceNames,
		}) => (
			binaryState
			? turnOffDevices(deviceNames)
			: turnOnDevices(deviceNames)
		)),
		catchEpicError(),
	)
)

module.exports = toggleDevicesEpic
