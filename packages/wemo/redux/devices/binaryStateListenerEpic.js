const { catchEpicError, ofNamespace } = require('@redux-observable-backend/redux-utils')
const { map, mergeMap, takeUntil } = require('rxjs/operators')
const { fromEvent } = require('rxjs')
const { ofType } = require('redux-observable')

const {
	ADD_DEVICE_CLIENT,
	REMOVE_DEVICE_CLIENT,
	updateBinaryState,
} = require('./actions')

const binaryStateListenerEpic = (
	action$,
) => (
	action$
	.pipe(
		ofType(ADD_DEVICE_CLIENT),
		mergeMap(({
			deviceClient,
			namespace,
		}) => (
			fromEvent(
				deviceClient,
				'binaryState',
			)
			.pipe(
				takeUntil(
					action$
					.pipe(
						ofType(
							ADD_DEVICE_CLIENT,
							REMOVE_DEVICE_CLIENT,
						),
						ofNamespace(namespace),
					)
				),
				map(binaryState => ({
					binaryState: (
						Number(binaryState)
					),
					namespace,
				})),
				map(updateBinaryState),
			)
		)),
		catchEpicError(),
	)
)

module.exports = binaryStateListenerEpic
