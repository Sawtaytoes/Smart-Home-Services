const { combineEpics } = require('redux-observable')
const { combineReducers } = require('redux')

const devicesListReducer = require('./devicesListReducer')
const errorListenerEpic = require('./errorListenerEpic')
const powerStateListenerEpic = require('./powerStateListenerEpic')
const powerStatesListReducer = require('./powerStatesListReducer')
const requestsEpic = require('./requestsEpic')
const startWemoClientEpic = require('./startWemoClientEpic')
const wemoClientReducer = require('./wemoClientReducer')
const wemoDeviceListenerEpic = require('./wemoDeviceListenerEpic')

const devicesEpic = (
	combineEpics(
		errorListenerEpic,
		powerStateListenerEpic,
		requestsEpic,
		startWemoClientEpic,
		wemoDeviceListenerEpic,
	)
)

const devicesReducer = (
	combineReducers({
		devicesList: devicesListReducer,
		powerStatesList: powerStatesListReducer,
		wemoClient: wemoClientReducer,
	})
)

module.exports = {
	devices: {
		actions: require('./actions'),
		selectors: require('./selectors'),
	},
	devicesEpic,
	devicesReducer,
}
