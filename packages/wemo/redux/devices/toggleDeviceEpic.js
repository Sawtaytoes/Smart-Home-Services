const { catchEpicError } = require('@redux-observable-backend/redux-utils')
const { map, pluck } = require('rxjs/operators')
const { ofType } = require('redux-observable')

const {
	TOGGLE_DEVICE,
	toggleDevices,
} = require('./actions')

const toggleDeviceEpic = (
	action$,
) => (
	action$
	.pipe(
		ofType(TOGGLE_DEVICE),
		pluck('deviceName'),
		map((
			deviceName,
		) => ([
			deviceName,
		])),
		map(toggleDevices),
		catchEpicError(),
	)
)

module.exports = toggleDeviceEpic
