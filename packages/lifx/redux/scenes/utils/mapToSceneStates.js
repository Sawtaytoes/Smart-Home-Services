const chalk = require('chalk')
const { from, of } = require('rxjs')
const { concatMap, filter, map, mergeMap, pluck, tap, toArray } = require('rxjs/operators')

const { selectScene } = require('../selectors')

const logSceneName = (
	sceneName,
) => (
	scene,
) => {
	scene
	? (
		console
		.info(
			chalk
			.greenBright(
				'[TOGGLE SCENE]'
			),
			(
				chalk
				.bgGreen(
					sceneName
				)
			)
		)
	)
	: (
		console
		.info(
			chalk
			.redBright(
				'[MISSING SCENE]'
			),
			(
				chalk
				.bgRed(
					sceneName
				)
			)
		)
	)
}

const logLightCount = (
	sceneStates,
) => {
	console
	.info(
		(
			'Lights in Scene:'
		),
		(
			chalk
			.yellowBright(
				sceneStates
				.length
			)
		)
	)
}

const mapToSceneStates = (
	state$,
) => (
	mergeMap((
		sceneNames,
	) => (
		from(sceneNames)
		.pipe(
			concatMap((
				sceneName,
			) => (
				of(
					state$
					.value
				)
				.pipe(
					map(
						selectScene({
							sceneName,
						})
					),
					tap(
						logSceneName(
							sceneName
						)
					),
				)
			)),
			filter(Boolean),
			pluck('states'),
			filter(Boolean),
			toArray(),
			map((
				sceneStates,
			) => (
				sceneStates
				.flat()
			)),
			tap(logLightCount),
		)
	))
)

module.exports = mapToSceneStates
