const { bindNodeCallback } = require('rxjs')
const { catchEpicError } = require('@redux-observable-backend/redux-utils')
const { ignoreElements, mergeMap } = require('rxjs/operators')
const { ofType } = require('redux-observable')

const { SET_BINARY_STATE } = require('./actions')

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
		)),
		catchEpicError(),
		ignoreElements(),
	)
)

module.exports = setBinaryStateEpic
