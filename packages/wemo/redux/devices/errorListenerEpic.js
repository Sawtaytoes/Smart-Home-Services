const { catchEpicError, ofNamespace } = require('@redux-observable-backend/redux-utils')
const { fromEvent, throwError } = require('rxjs')
const { ignoreElements, mergeMap, switchMap, takeUntil, tap } = require('rxjs/operators')
const { ofType } = require('redux-observable')

const logDebugMessage = require('./utils/logDebugMessage')
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
				tap((
					error,
				) => {
					logDebugMessage(
						`|||${namespace}||| errored:\n|||${error}|||`,
						'redBright',
					)
				}),
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
