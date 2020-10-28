const chalk = require('chalk')
const { fromEvent, merge } = require('rxjs')
const { ignoreElements, map, mergeMap, tap } = require('rxjs/operators')
const { catchEpicError } = require('@redux-observable-backend/redux-utils')
const { ofType } = require('redux-observable')

const takeUntilFlicClientTerminated = require('./utils/takeUntilFlicClientTerminated')
const { ADDED_FLIC_CLIENT } = require('./actions')

const fromFlicClientEventPayload = ({
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
					fromFlicClientEventPayload({
						flicClient,
						eventName: 'advertisementPacket',
					})
				),
				(
					fromFlicClientEventPayload({
						flicClient,
						eventName: 'batteryStatus',
					})
				),
				(
					fromFlicClientEventPayload({
						flicClient,
						eventName: 'bluetoothControllerStateChange',
					})
				),
				(
					fromFlicClientEventPayload({
						flicClient,
						eventName: 'buttonConnected',
					})
				),
				(
					fromFlicClientEventPayload({
						flicClient,
						eventName: 'buttonDeleted',
					})
				),
				(
					fromFlicClientEventPayload({
						flicClient,
						eventName: 'completed',
					})
				),
				(
					fromFlicClientEventPayload({
						flicClient,
						eventName: 'connectionStatusChanged',
					})
				),
				(
					fromFlicClientEventPayload({
						flicClient,
						eventName: 'createResponse',
					})
				),
				(
					fromFlicClientEventPayload({
						flicClient,
						eventName: 'foundPrivateButton',
					})
				),
				(
					fromFlicClientEventPayload({
						flicClient,
						eventName: 'foundPublicButton',
					})
				),
				(
					fromFlicClientEventPayload({
						flicClient,
						eventName: 'gotSpaceForNewConnection',
					})
				),
				(
					fromFlicClientEventPayload({
						flicClient,
						eventName: 'newVerifiedButton',
					})
				),
				(
					fromFlicClientEventPayload({
						flicClient,
						eventName: 'noSpaceForNewConnection',
					})
				),
				(
					fromFlicClientEventPayload({
						flicClient,
						eventName: 'removed',
					})
				),
			)
			.pipe(
				takeUntilFlicClientTerminated({
					action$,
					flicClient,
				}),
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
					.bgOrange('[Event Log]')
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
