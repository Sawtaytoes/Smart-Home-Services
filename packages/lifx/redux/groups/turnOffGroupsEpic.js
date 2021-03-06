const chalk = require('chalk')
const { bindNodeCallback, from, of } = require('rxjs')
const { catchEpicError } = require('@redux-observable-backend/redux-utils')
const { filter, ignoreElements, map, mergeMap, pluck, reduce, switchMap, takeUntil, tap, toArray } = require('rxjs/operators')
const { ofType } = require('redux-observable')

const { selectLightIds } = require('./selectors')
const { selectNetworkLight } = require('$redux/lights/selectors')
const { TURN_OFF_GROUPS } = require('./actions')

const changePowerStateDuration = 0

const changeLightPower = (
	powerFuncName,
) => (
	light,
) => (
	bindNodeCallback(
		light[powerFuncName]
		.bind(light)
	)(
		changePowerStateDuration,
	)
	.pipe(
		catchEpicError(
			of(null)
		),
	)
)

const turnOffLight = changeLightPower('off')

const turnOffGroupsEpic = (
	action$,
	state$,
) => (
	action$
	.pipe(
		ofType(TURN_OFF_GROUPS),
		pluck('groupNames'),
		mergeMap((
			groupNames,
		) => (
			from(groupNames)
			.pipe(
				mergeMap((
					groupName,
				) => (
					of(state$.value)
					.pipe(
						map(
							selectLightIds({
								groupName,
							})
						),
						tap(lightIds => (
							(
								!lightIds
								|| !lightIds.size
							)
							? (
								console
								.info(
									chalk
									.redBright(
										'[MISSING GROUP]'
									),
									(
										chalk
										.bgRed(
											groupName
										)
									)
								)
							)
							: (
								console
								.info(
									chalk
									.greenBright(
										'[TOGGLE GROUP]'
									),
									(
										chalk
										.bgGreen(
											groupName
										)
									)
								)
							)
						)),
						takeUntil(
							action$
							.pipe(
								ofType(TURN_OFF_GROUPS),
								filter(action => (
									action
									.groupNames === groupNames
								))
							)
						),
					)
				)),
				filter(Boolean),
				reduce(
					(
						combinedLightIds,
						lightIds,
					) => (
						new Set([
							...combinedLightIds,
							...lightIds,
						])
					),
					new Set(),
				),
			)
		)),
		map(lightIds => (
			Array
			.from(lightIds)
		)),
		mergeMap(lightIds => (
			from(lightIds)
			.pipe(
				mergeMap(lightId => (
					of(state$.value)
					.pipe(
						map(
							selectNetworkLight({
								lightId,
							})
						),
						filter(Boolean),
						switchMap(light => (
							bindNodeCallback(
								light
								.getPower
								.bind(light)
							)()
							.pipe(
								map(power => ({
									light,
									power,
								})),
								catchEpicError(
									of(null)
								),
							)
						)),
					)
				)),
				filter(Boolean),
				toArray(),
			)
		)),
		tap(lightsInGroup => {
			console
			.info(
				(
					'Lights in Group:'
				),
				(
					chalk
					.yellowBright(
						lightsInGroup
						.length
					)
				)
			)
		}),
		map(lightsInGroup => ({
			changeLightPower: turnOffLight,
			lightsInGroup,
		})),
		mergeMap(({
			changeLightPower,
			lightsInGroup,
		}) => (
			from(lightsInGroup)
			.pipe(
				pluck('light'),
				mergeMap(changeLightPower),
				toArray(),
			)
		)),
		map((
			lights,
		) => ({
			numberOfLightsInGroup: (
				lights
				.length
			),
			numberOfToggledLightsInGroup: (
				lights
				.filter(Boolean)
				.length
			),
		})),
		tap(({
			numberOfLightsInGroup,
			numberOfToggledLightsInGroup,
		}) => (
			numberOfLightsInGroup
			!== numberOfToggledLightsInGroup
			&& (
				console
				.error(
					chalk
					.redBright(
						'[NOT ALL LIGHTS TOGGLED]'
					),
					(
						chalk
						.bgRed(
							JSON
							.stringify(
								{
									actual: numberOfToggledLightsInGroup,
									expected: numberOfLightsInGroup,
								},
								true,
								2,
							)
						)
					)
				)
			)
		)),
		catchEpicError(),
		ignoreElements(),
	)
)

module.exports = turnOffGroupsEpic
