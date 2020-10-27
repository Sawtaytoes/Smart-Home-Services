const chalk = require('chalk')
const { fromEvent, merge } = require('rxjs')
const { ignoreElements, map, mergeMap, tap } = require('rxjs/operators')
const { catchEpicError } = require('@redux-observable-backend/redux-utils')
const { ofType } = require('redux-observable')

const takeUntilFlicClientTerminated = require('./utils/takeUntilFlicClientTerminated')
const { ADDED_FLIC_CLIENT } = require('./actions')

const fromFlicClientEvent = ({
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
					fromFlicClientEvent({
						flicClient,
						eventName: 'advertisementPacket',
					})
				),
				(
					fromFlicClientEvent({
						flicClient,
						eventName: 'batteryStatus',
					})
				),
				(
					fromFlicClientEvent({
						flicClient,
						eventName: 'bluetoothControllerStateChange',
					})
				),
				(
					fromFlicClientEvent({
						flicClient,
						eventName: 'buttonConnected',
					})
				),
				(
					fromFlicClientEvent({
						flicClient,
						eventName: 'buttonDeleted',
					})
				),
				(
					fromFlicClientEvent({
						flicClient,
						eventName: 'completed',
					})
				),
				(
					fromFlicClientEvent({
						flicClient,
						eventName: 'connectionStatusChanged',
					})
				),
				(
					fromFlicClientEvent({
						flicClient,
						eventName: 'createResponse',
					})
				),
				(
					fromFlicClientEvent({
						flicClient,
						eventName: 'foundPrivateButton',
					})
				),
				(
					fromFlicClientEvent({
						flicClient,
						eventName: 'foundPublicButton',
					})
				),
				(
					fromFlicClientEvent({
						flicClient,
						eventName: 'gotSpaceForNewConnection',
					})
				),
				(
					fromFlicClientEvent({
						flicClient,
						eventName: 'newVerifiedButton',
					})
				),
				(
					fromFlicClientEvent({
						flicClient,
						eventName: 'noSpaceForNewConnection',
					})
				),
				(
					fromFlicClientEvent({
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
