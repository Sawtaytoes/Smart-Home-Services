const chalk = require('chalk')
const { fromEvent, merge, of } = require('rxjs')
const { ignoreElements, map, mergeMap, switchMap, takeUntil, tap } = require('rxjs/operators')
const { catchEpicError } = require('@redux-observable-backend/redux-utils')
const { ofType } = require('redux-observable')

const { ADD_FLIC_CLIENT } = require('./actions')

const flicEventLoggerEpic = (
	action$,
) => (
	action$
	.pipe(
		ofType(ADD_FLIC_CLIENT),
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
				map((
					payload,
				) => ({
					eventName: 'ready',
					payload,
				})),
				switchMap((
					info,
				) => (
					merge(
						(
							of(
								info,
							)
						),
						(
							fromEvent(
								flicClient,
								'createResponse',
							)
							.pipe(
								map((
									payload,
								) => ({
									eventName: 'createResponse',
									payload,
								}))
							)
						),
						(
							fromEvent(
								flicClient,
								'connectionStatusChanged',
							)
							.pipe(
								map((
									payload,
								) => ({
									eventName: 'connectionStatusChanged',
									payload,
								}))
							)
						),
						(
							fromEvent(
								flicClient,
								'removed',
							)
							.pipe(
								map((
									payload,
								) => ({
									eventName: 'removed',
									payload,
								}))
							)
						),
						(
							fromEvent(
								flicClient,
								'batteryStatus',
							)
							.pipe(
								map((
									payload,
								) => ({
									eventName: 'batteryStatus',
									payload,
								}))
							)
						),
						(
							fromEvent(
								flicClient,
								'advertisementPacket',
							)
							.pipe(
								map((
									payload,
								) => ({
									eventName: 'advertisementPacket',
									payload,
								}))
							)
						),
						(
							fromEvent(
								flicClient,
								'foundPrivateButton',
							)
							.pipe(
								map((
									payload,
								) => ({
									eventName: 'foundPrivateButton',
									payload,
								}))
							)
						),
						(
							fromEvent(
								flicClient,
								'foundPublicButton',
							)
							.pipe(
								map((
									payload,
								) => ({
									eventName: 'foundPublicButton',
									payload,
								}))
							)
						),
						(
							fromEvent(
								flicClient,
								'buttonConnected',
							)
							.pipe(
								map((
									payload,
								) => ({
									eventName: 'buttonConnected',
									payload,
								}))
							)
						),
						(
							fromEvent(
								flicClient,
								'completed',
							)
							.pipe(
								map((
									payload,
								) => ({
									eventName: 'completed',
									payload,
								}))
							)
						),
						(
							fromEvent(
								flicClient,
								'close',
							)
							.pipe(
								map((
									payload,
								) => ({
									eventName: 'close',
									payload,
								}))
							)
						),
						(
							fromEvent(
								flicClient,
								'newVerifiedButton',
							)
							.pipe(
								map((
									payload,
								) => ({
									eventName: 'newVerifiedButton',
									payload,
								}))
							)
						),
						(
							fromEvent(
								flicClient,
								'noSpaceForNewConnection',
							)
							.pipe(
								map((
									payload,
								) => ({
									eventName: 'noSpaceForNewConnection',
									payload,
								}))
							)
						),
						(
							fromEvent(
								flicClient,
								'gotSpaceForNewConnection',
							)
							.pipe(
								map((
									payload,
								) => ({
									eventName: 'gotSpaceForNewConnection',
									payload,
								}))
							)
						),
						(
							fromEvent(
								flicClient,
								'bluetoothControllerStateChange',
							)
							.pipe(
								map((
									payload,
								) => ({
									eventName: 'bluetoothControllerStateChange',
									payload,
								}))
							)
						),
						(
							fromEvent(
								flicClient,
								'buttonDeleted',
							)
							.pipe(
								map((
									payload,
								) => ({
									eventName: 'buttonDeleted',
									payload,
								}))
							)
						),
						(
							fromEvent(
								flicClient,
								'error',
							)
							.pipe(
								map((
									payload,
								) => ({
									eventName: 'error',
									payload,
								}))
							)
						),
					)
				)),
				map((
					info,
				) => ({
					...info,
					hostname,
				})),
			)
		)),
		tap((
			info,
		) => {
			console
			.info(
				(
					chalk
					.redBright('[DEBUG]')
					.concat('\n')
				),
				(
					info
				),
			)
		}),
		ignoreElements(),
		catchEpicError(),
	)
)

module.exports = flicEventLoggerEpic
