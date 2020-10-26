const chalk = require('chalk')
const { fromEvent, merge } = require('rxjs')
const { filter, ignoreElements, map, mergeMap, takeUntil, tap } = require('rxjs/operators')
const { catchEpicError } = require('@redux-observable-backend/redux-utils')
const { ofType } = require('redux-observable')

const { ADDED_FLIC_CLIENT, FLIC_CLIENT_TERMINATED } = require('./actions')

const fromFlicEvent = ({
	flicClient,
	eventName,
}) => (
	fromEvent(
		flicClient,
		eventName,
	)
	.pipe(
		map((
			payload,
		) => (
			payload
			? {
				eventName,
				payload,
			}
			: {
				eventName,
			}
		))
	)
)

const flicEventLoggerEpic = (
	action$,
) => (
	action$
	.pipe(
		ofType(ADDED_FLIC_CLIENT),
		mergeMap(({
			flicClient,
			hostname,
		}) => (
			merge(
				(
					fromFlicEvent({
						flicClient,
						eventName: 'advertisementPacket',
					})
				),
				(
					fromFlicEvent({
						flicClient,
						eventName: 'batteryStatus',
					})
				),
				(
					fromFlicEvent({
						flicClient,
						eventName: 'bluetoothControllerStateChange',
					})
				),
				(
					fromFlicEvent({
						flicClient,
						eventName: 'buttonConnected',
					})
				),
				(
					fromFlicEvent({
						flicClient,
						eventName: 'buttonDeleted',
					})
				),
				(
					fromFlicEvent({
						flicClient,
						eventName: 'completed',
					})
				),
				(
					fromFlicEvent({
						flicClient,
						eventName: 'connectionStatusChanged',
					})
				),
				(
					fromFlicEvent({
						flicClient,
						eventName: 'createResponse',
					})
				),
				(
					fromFlicEvent({
						flicClient,
						eventName: 'error',
					})
				),
				(
					fromFlicEvent({
						flicClient,
						eventName: 'foundPrivateButton',
					})
				),
				(
					fromFlicEvent({
						flicClient,
						eventName: 'foundPublicButton',
					})
				),
				(
					fromFlicEvent({
						flicClient,
						eventName: 'gotSpaceForNewConnection',
					})
				),
				(
					fromFlicEvent({
						flicClient,
						eventName: 'newVerifiedButton',
					})
				),
				(
					fromFlicEvent({
						flicClient,
						eventName: 'noSpaceForNewConnection',
					})
				),
				(
					fromFlicEvent({
						flicClient,
						eventName: 'removed',
					})
				),
			)
			.pipe(
				takeUntil(
					action$
					.pipe(
						ofType(FLIC_CLIENT_TERMINATED),
						filter(({
							flicClient: terminatedFlicClient,
						}) => (
							Object.is(
								terminatedFlicClient,
								flicClient,
							)
						))
					)
				),
				map((
					eventInfo,
				) => ({
					...eventInfo,
					hostname,
				})),
			)
		)),
		tap((
			eventInfo,
		) => {
			console
			.info(
				(
					chalk
					.orangeBright
					.bgOrange('[EVENT LOG]')
					.concat('\n')
				),
				(
					eventInfo
				),
			)
		}),
		ignoreElements(),
		catchEpicError(),
	)
)

module.exports = flicEventLoggerEpic
