const { catchEpicError } = require('@redux-observable-backend/redux-utils')
const { map, pluck } = require('rxjs/operators')
const { ofRequestType } = require('@redux-observable-backend/websocket')

const {
	TOGGLE_DEVICES,
	toggleDevices,
} = require('./actions')

const requestsEpic = (
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

module.exports = requestsEpic
