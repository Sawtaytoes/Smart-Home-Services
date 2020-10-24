const chalk = require('chalk')
const { fromEvent, merge } = require('rxjs')
const { ignoreElements, map, mergeMap, takeUntil, tap } = require('rxjs/operators')
const { catchEpicError } = require('@redux-observable-backend/redux-utils')
const { ofType } = require('redux-observable')

const { FLIC_CLIENT_READY, FLIC_CLIENT_TERMINATED } = require('./actions')
const ofFlicClient = require('./utils/ofFlicClient')

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
		ofType(FLIC_CLIENT_READY),
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
						ofFlicClient(
							flicClient
						),
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
					.redBright
					.bgRed('[EVENT LOG]')
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
