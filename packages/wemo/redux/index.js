const { combineEpics } = require('redux-observable')
const { combineReducers } = require('redux')
const { webSocketsEpic, webSocketsReducers } = require('@redux-observable-backend/websocket')

const {
	devicesEpic,
	devicesReducer,
} = require('./devices')

const rootEpic = (
	combineEpics(
		devicesEpic,
		webSocketsEpic,
	)
)

const rootReducers = {
	...webSocketsReducers,
	devices: devicesReducer,
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
