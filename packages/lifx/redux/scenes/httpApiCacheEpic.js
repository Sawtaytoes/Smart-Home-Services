const fs = require('fs')
const { bindNodeCallback, of } = require('rxjs')
const { catchEpicError } = require('@redux-observable-backend/redux-utils')
const { combineEpics, ofType } = require('redux-observable')
const { ignoreElements, map, switchMap } = require('rxjs/operators')
const { safeImport } = require('@redux-observable-backend/core')

const { selectHttpApiScenes } = require('./selectors')

const {
	ADD_HTTP_API_SCENES,
	addHttpApiScenes,
} = require('./actions')

const loadFromCacheEpic = () => (
	of(
		safeImport({
			defaultValue: [],
			filePath: '$cache/scenes.json',
		})
	)
	.pipe(
		map(addHttpApiScenes),
		catchEpicError(),
	)
)

const storeInCacheEpic = (
	action$,
	state$,
) => (
	action$
	.pipe(
		ofType(ADD_HTTP_API_SCENES),
		map(() => state$.value),
		map(selectHttpApiScenes()),
		map(JSON.stringify),
		switchMap(scenesJson => (
			bindNodeCallback(
				fs
				.writeFile
			)(
				'.cache/scenes.json',
				scenesJson,
			)
		)),
		catchEpicError(),
		ignoreElements(),
	)
)

const httpApiCacheEpic = (
	combineEpics(
		loadFromCacheEpic,
		storeInCacheEpic,
	)
)

module.exports = httpApiCacheEpic
