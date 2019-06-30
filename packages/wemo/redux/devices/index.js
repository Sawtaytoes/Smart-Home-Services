const { combineEpics } = require('redux-observable')
const { combineReducers } = require('redux')

const binaryStateListenerEpic = require('./binaryStateListenerEpic')
const binaryStateListReducer = require('./binaryStateListReducer')
const deviceClientListReducer = require('./deviceClientListReducer')
const errorListenerEpic = require('./errorListenerEpic')
const requestsEpic = require('./requestsEpic')
const startWemoClientEpic = require('./startWemoClientEpic')
const toggleDeviceEpic = require('./toggleDeviceEpic')
const toggleDevicesEpic = require('./toggleDevicesEpic')
const wemoClientReducer = require('./wemoClientReducer')
const wemoDeviceListenerEpic = require('./wemoDeviceListenerEpic')

const devicesEpic = (
	combineEpics(
		binaryStateListenerEpic,
		errorListenerEpic,
		requestsEpic,
		startWemoClientEpic,
		toggleDeviceEpic,
		toggleDevicesEpic,
		wemoDeviceListenerEpic,
	)
)

const devicesReducer = (
	combineReducers({
		binaryStateList: binaryStateListReducer,
		deviceClientList: deviceClientListReducer,
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
