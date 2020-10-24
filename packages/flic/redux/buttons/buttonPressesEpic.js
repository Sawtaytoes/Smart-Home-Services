const { bindCallback, fromEvent, of } = require('rxjs')
const { buffer, debounceTime, map, mergeMap, switchMap, takeUntil, tap } = require('rxjs/operators')
const { catchEpicError } = require('@redux-observable-backend/redux-utils')
const { FlicConnectionChannel } = require('fliclib/clientlib/nodejs/fliclibNodeJs')
const { ofType } = require('redux-observable')

const {
	ADDED_FLIC_CLIENT,
	captureButtonPresses,
} = require('./actions')

const buttonPressesEpic = (
	action$,
) => (
	action$
	.pipe(
		ofType(ADDED_FLIC_CLIENT),
		mergeMap(({
			flicClient,
			hostname,
		}) => (
			fromEvent(
				flicClient,
				'ready',
			)
			.pipe(
				takeUntil(
					fromEvent(
						flicClient,
						'close',
					)
				),
				switchMap(() => (
					bindCallback(
						flicClient
						.getInfo
						.bind(flicClient)
					)()
				)),
				switchMap(flicClientInfo => (
					flicClientInfo
					.bdAddrOfVerifiedButtons
				)),
				mergeMap(bluetoothAddress => (
					of(
						new FlicConnectionChannel(
							bluetoothAddress,
						)
					)
					.pipe(
						tap(flicConnectionChannel => (
							flicClient
							.addConnectionChannel(
								flicConnectionChannel,
							)
						)),
						map(flicConnectionChannel => (
							fromEvent(
								flicConnectionChannel,
								'buttonUpOrDown',
							)
						)),
						switchMap(buttonPress$ => (
							buttonPress$
							.pipe(
								map(([buttonPressState]) => (
									buttonPressState
								)),
								buffer(
									buttonPress$
									.pipe(
										debounceTime(300),
									)
								),
							)
						)),
						map(buttonPressStates => ({
							bluetoothAddress,
							buttonPressStates,
							hostname,
						})),
						map(captureButtonPresses),
					)
				)),
			)
		)),
		catchEpicError(),
	)
)

module.exports = buttonPressesEpic
