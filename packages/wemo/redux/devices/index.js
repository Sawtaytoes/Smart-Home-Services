const { combineEpics } = require('redux-observable')

const startWemoClientEpic = require('./startWemoClientEpic')
const startWemoDeviceListenerEpic = require('./startWemoDeviceListenerEpic')

const devicesEpic = (
	combineEpics(
		startWemoClientEpic,
		startWemoDeviceListenerEpic,
	)
)

module.exports = {
	devicesEpic,
}
