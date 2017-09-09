const Wemo = require('wemo-client')

const dir = require(`${global.baseDir}global-dirs`)
const logger = require(`${dir.utils}logger`)

const deviceClients = new Map()

const logBinaryStateChange = deviceInfo => value => (
	logger.log(deviceInfo.friendlyName, 'set to:', value)
)

const logDeviceFound = deviceInfo => (
	logger.log('Device Found: %s %j', deviceInfo.host, deviceInfo.friendlyName)
)

const logError = err => logger.logError('Error:', err.code)

const removeWemoDeviceFromStore = (deviceClient, friendlyName) => (
	deviceClients.delete(friendlyName)
)

const addWemoDeviceToStore = (deviceClient, friendlyName) => (
	deviceClients.set(friendlyName, deviceClient)
)

const onDeviceDiscovery = wemo => (_, deviceInfo) => {
	logDeviceFound(deviceInfo)

	if (!deviceInfo) return

	const deviceClient = wemo.client(deviceInfo)

	deviceClient
	.on('binaryState', logBinaryStateChange(deviceInfo))
	.on('error', logError)

	const { friendlyName } = deviceClient.device

	removeWemoDeviceFromStore(deviceClient, friendlyName)
	addWemoDeviceToStore(deviceClient, friendlyName)
}

const discoverDevices = () => {
	const wemo = new Wemo()
	wemo.discover(onDeviceDiscovery(wemo))
}

const init = discoverDevices

const update = init

module.exports = {
	init,
	update,
	deviceClients,
}
