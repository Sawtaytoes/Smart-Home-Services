const { combineEpics } = require('redux-observable')
const { combineReducers } = require('redux')

const addScenesEpic = require('./addScenesEpic')
const httpApiCacheEpic = require('./httpApiCacheEpic')
const httpApiDiscoveryEpic = require('./httpApiDiscoveryEpic')
const httpApiScenesListReducer = require('./httpApiScenesListReducer')
const requestsEpic = require('./requestsEpic')
const scenesListReducer = require('./scenesListReducer')
const toggleSceneEpic = require('./toggleSceneEpic')
const toggleScenesEpic = require('./toggleScenesEpic')

const scenesEpic = (
	combineEpics(
		addScenesEpic,
		httpApiCacheEpic,
		httpApiDiscoveryEpic,
		requestsEpic,
		toggleSceneEpic,
		toggleScenesEpic,
	)
)

const scenesReducer = (
	combineReducers({
		httpApiScenesList: httpApiScenesListReducer,
		scenesList: scenesListReducer,
	})
)

module.exports = {
	scenes: {
		actions: require('./actions'),
		selectors: require('./selectors'),
	},
	scenesEpic,
	scenesReducer,
}
