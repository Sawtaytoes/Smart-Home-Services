const { merge, of } = require('rxjs')
const { catchEpicError } = require('@redux-observable-backend/redux-utils')
const { map, mergeAll, mergeMap, pluck, toArray } = require('rxjs/operators')

const mapToSceneStates = require('./utils/mapToSceneStates')
const toggleScenes = require('./utils/toggleScenes')
const { lockLights } = require('$redux/lights/actions')
const { ofType } = require('redux-observable')
const { TOGGLE_SCENES } = require('./actions')

const toggleScenesEpic = (
	action$,
	state$,
) => (
	action$
	.pipe(
		ofType(TOGGLE_SCENES),
		pluck('sceneNames'),
		mapToSceneStates(
			state$
		),
		mergeMap((
			sceneStates,
		) => (
			of(sceneStates)
			.pipe(
				mergeAll(),
				pluck('lightId'),
				toArray(),
				map((
					lightIds,
				) => ({
					lightIds,
					sceneStates,
				})),
			)
		)),
		mergeMap(({
			lightIds,
			sceneStates,
		}) => (
			merge(
				(
					of(
						lockLights(
							lightIds,
						)
					)
				),
				(
					toggleScenes({
						lightIds,
						sceneStates,
						state$,
					})
				),
			)
		)),
		catchEpicError(),
	)
)

module.exports = toggleScenesEpic
