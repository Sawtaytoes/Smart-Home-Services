const { catchEpicError, ofNamespace } = require('@redux-observable-backend/redux-utils')
const { ignoreElements, mergeMap, switchMap, takeUntil } = require('rxjs/operators')
const { fromEvent, throwError } = require('rxjs')
const { ofType } = require('redux-observable')

const {
	ADD_DEVICE_CLIENT,
	REMOVE_DEVICE_CLIENT,
} = require('./actions')

const errorListenerEpic = (
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
				'error',
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
				switchMap(error => (
					throwError(`
						${deviceClient.device.friendlyName}
						${error}
					`)
				)),
			)
		)),
		catchEpicError(),
		ignoreElements(),
	)
)

module.exports = errorListenerEpic
