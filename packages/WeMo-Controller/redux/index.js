const { combineEpics } = require('redux-observable')
const { combineReducers } = require('redux')
const { webSocketsEpic, webSocketsReducers } = require('@ghadyani-framework/websocket')

const { devicesEpic } = require('./devices')

const rootEpic = (
	combineEpics(
		devicesEpic,
		webSocketsEpic,
	)
)

const rootReducers = {
	...webSocketsReducers,
}

const rootReducer = (
	combineReducers(
		rootReducers,
	)
)

module.exports = {
	rootEpic,
	rootReducers,
	rootReducer,
}
