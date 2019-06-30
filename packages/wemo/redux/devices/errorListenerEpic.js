const { catchEpicError, ofNamespace } = require('@redux-observable-backend/redux-utils')
const { distinctUntilChanged, filter, ignoreElements, map, mergeMap, switchMap, takeUntil, tap } = require('rxjs/operators')
const { fromEvent, throwError } = require('rxjs')
const { ofType } = require('redux-observable')

const {
	ADD_DEVICE,
	REMOVE_DEVICE,
} = require('./actions')

const { selectWemoClient } = require('./selectors')

const errorListenerEpic = (
	action$,
	state$,
) => (
	state$
	.pipe(
		map(selectWemoClient()),
		distinctUntilChanged(),
		filter(Boolean),
		switchMap(wemoClient => (
			action$
			.pipe(
				ofType(ADD_DEVICE),
				mergeMap(({
					device,
					namespace,
				}) => (
					fromEvent(
						wemoClient.client(device),
						'error',
					)
					.pipe(
						takeUntil(
							action$
							.pipe(
								ofType(
									ADD_DEVICE,
									REMOVE_DEVICE,
								),
								ofNamespace(namespace),
							)
						),
						switchMap(error => (
							throwError(`
								${device.friendlyName}
								${error}
							`)
						)),
					)
				)),
			)
		)),
		catchEpicError(),
		ignoreElements(),
	)
)

module.exports = errorListenerEpic
