const chalk = require('chalk')
const { bindNodeCallback, from, merge, of } = require('rxjs')
const { catchEpicError } = require('@redux-observable-backend/redux-utils')
const { every, filter, map, mapTo, mergeAll, mergeMap, pluck, switchMap, tap, toArray } = require('rxjs/operators')

const { selectNetworkLight } = require('$redux/lights/selectors')
const { unlockLights } = require('$redux/lights/actions')

const changeColorStateDuration = 500
const changePowerStateDuration = 0
const marginOfError = 2

const relativeEquals = (
	value1 = 0,
	value2 = 0,
) => (
	value1 - marginOfError <= value2
	&& value1 + marginOfError >= value2
)

const toggleScenes = ({
	lightIds,
	sceneStates,
	state$,
}) => (
	from(sceneStates)
	.pipe(
		mergeMap(({
			brightness: sceneLightBrightness,
			color: sceneLightColor,
			lightId,
			power: sceneLightPower,
		}) => (
			of(
				state$
				.value
			)
			.pipe(
				map(
					selectNetworkLight({
						lightId,
					})
				),
				filter(Boolean),
				switchMap((
					light,
				) => (
					bindNodeCallback(
						light
						.getState
						.bind(light)
					)()
					.pipe(
						map(({
							color: lightColor,
							power: lightPower,
						}) => ({
							isLightPowered: (
								Boolean(lightPower)
							),
							isSceneLightPowered: (
								sceneLightPower === 'on'
							),
							light,
							lightColor,
							sceneLightColor: {
								...sceneLightColor,
								brightness: (
									sceneLightBrightness * 100
								),
								saturation: (
									sceneLightColor.saturation * 100
									|| 0
								),
							},
							sceneLightPower,
						})),
						map(({
							isLightPowered,
							isSceneLightPowered,
							light,
							lightColor,
							sceneLightColor,
						}) => ({
							isLightMatchingPoweredState: (
								isLightPowered
								&& isSceneLightPowered
							),
							isLightMatchingSceneState: (
								(
									!isLightPowered
									&& !isSceneLightPowered
								)
								|| (
									(
										isLightPowered
										&& isSceneLightPowered
									)
									&& (
										relativeEquals(
											lightColor.brightness,
											sceneLightColor.brightness,
										)
									)
									&& (
										relativeEquals(
											lightColor.hue,
											sceneLightColor.hue,
										)
									)
									&& (
										relativeEquals(
											lightColor.kelvin,
											sceneLightColor.kelvin,
										)
									)
									&& (
										relativeEquals(
											lightColor.saturation,
											sceneLightColor.saturation,
										)
									)
								)
							),
							light,
							sceneLightColor,
							sceneLightPower,
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
		switchMap((
			lightStates,
		) => (
			from(lightStates)
			.pipe(
				pluck('isLightMatchingSceneState'),
				every(Boolean),
				tap((
					isSceneActive,
				) => {
					console
					.info(
						chalk
						.bgGreen(
							isSceneActive
							? '[TURNING OFF SCENE]'
							: '[TURNING ON SCENE]'
						)
					)
				}),
				switchMap((
					isSceneActive,
				) => (
					isSceneActive
					? (
						from(lightStates)
						.pipe(
							pluck('light'),
							map((
								light,
							) => (
								bindNodeCallback(
									light
									.off
									.bind(light)
								)(
									changePowerStateDuration,
								)
							)),
							mergeAll(),
						)
					)
					: (
						merge(
							(
								from(lightStates)
								.pipe(
									filter(({
										isLightMatchingSceneState,
									}) => (
										!isLightMatchingSceneState
									)),
									mergeMap(({
										light,
										sceneLightColor,
									}) => (
										bindNodeCallback(
											light
											.color
											.bind(light)
										)(
											sceneLightColor.hue,
											sceneLightColor.saturation,
											sceneLightColor.brightness,
											sceneLightColor.kelvin,
											changeColorStateDuration,
										)
										.pipe(
											mapTo(light),
										)
									)),
								)
							),
							(
								from(lightStates)
								.pipe(
									filter(({
										isLightMatchingPoweredState,
									}) => (
										!isLightMatchingPoweredState
									)),
									mergeMap(({
										light,
										sceneLightPower,
									}) => (
										bindNodeCallback(
											light[sceneLightPower]
											.bind(light)
										)(
											changePowerStateDuration,
										)
										.pipe(
											mapTo(light),
										)
									)),
								)
							)
						)
					)
				)),
			)
		)),
		toArray(),
		catchEpicError(
			of(null)
		),
		tap(({
			numberOfLightsInScene,
			numberOfToggledLightsInScene,
		}) => (
			numberOfLightsInScene
			!== numberOfToggledLightsInScene
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
									actual: numberOfToggledLightsInScene,
									expected: numberOfLightsInScene,
								},
								null,
								2,
							)
						)
					)
				)
			)
		)),
		mapTo(lightIds),
		map(unlockLights),
	)
)

module.exports = toggleScenes
