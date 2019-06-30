const { catchEpicError, ofNamespace } = require('@redux-observable-backend/redux-utils')
const { distinctUntilChanged, filter, map, mergeMap, switchMap, takeUntil } = require('rxjs/operators')
const { fromEvent } = require('rxjs')
const { ofType } = require('redux-observable')

const powerStates = require('./utils/powerStates')
const { selectWemoClient } = require('./selectors')

const {
	ADD_DEVICE,
	addPowerState,
	REMOVE_DEVICE,
} = require('./actions')

const powerStateListenerEpic = (
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
						'binaryState',
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
						map(binaryState => ({
							namespace,
							powerState: (
								binaryState !== '0'
								? powerStates.ON
								: powerStates.OFF
							),
						})),
						map(addPowerState),
					)
				)),
			)
		)),
		catchEpicError(),
	)
)

module.exports = powerStateListenerEpic
