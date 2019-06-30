const { catchEpicError } = require('@redux-observable-backend/redux-utils')
const { combineEpics } = require('redux-observable')
const { map, pluck } = require('rxjs/operators')
const { ofRequestType } = require('@redux-observable-backend/websocket')

const {
	TOGGLE_DEVICES,
	toggleDevices,
	TURN_OFF_DEVICES,
	TURN_ON_DEVICES,
	turnOffDevices,
	turnOnDevices,
} = require('./actions')

const toggleDevicesRequestEpic = (
	action$,
) => (
	action$
	.pipe(
		ofRequestType(TOGGLE_DEVICES),
		pluck('names'),
		map(toggleDevices),
		catchEpicError(),
	)
)

const turnOffDevicesRequestEpic = (
	action$,
) => (
	action$
	.pipe(
		ofRequestType(TURN_OFF_DEVICES),
		pluck('names'),
		map(turnOffDevices),
		catchEpicError(),
	)
)

const turnOnDevicesRequestEpic = (
	action$,
) => (
	action$
	.pipe(
		ofRequestType(TURN_ON_DEVICES),
		pluck('names'),
		map(turnOnDevices),
		catchEpicError(),
	)
)

const requestsEpic = (
	combineEpics(
		toggleDevicesRequestEpic,
		turnOffDevicesRequestEpic,
		turnOnDevicesRequestEpic,
	)
)

module.exports = requestsEpic
