const { bindNodeCallback } = require('rxjs')
const { catchEpicError } = require('@redux-observable-backend/redux-utils')
const { map, mapTo, mergeMap } = require('rxjs/operators')
const { ofType } = require('redux-observable')

const {
	SET_BINARY_STATE,
	updateBinaryState,
} = require('./actions')

const setBinaryStateEpic = (
	action$,
) => (
	action$
	.pipe(
		ofType(SET_BINARY_STATE),
		mergeMap(({
			deviceClient,
			binaryState,
		}) => (
			bindNodeCallback(
				deviceClient
				.setBinaryState
				.bind(deviceClient)
			)(
				binaryState,
			)
			.pipe(
				mapTo({
					binaryState,
					namespace: (
						deviceClient
						.device
						.friendlyName
					),
				}),
				map(updateBinaryState),
			)
		)),
		catchEpicError(),
	)
)

module.exports = setBinaryStateEpic
