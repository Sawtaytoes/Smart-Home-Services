const Wemo = require('wemo-client')

const dir = require(`${global.baseDir}/global-dirs`)
const logger = require(`${dir.utils}/logger`)

const wemo = new Wemo()
const deviceClients = new Map()

const storeWemoDeviceClient = ({ friendlyName }, deviceClient) => deviceClients.set(friendlyName, deviceClient)

const discoverDevices = () => (
	wemo.discover((_, deviceInfo) => {
		if (!deviceInfo) return

		const { friendlyName } = deviceInfo

		logger.log('Wemo Device Found: %j', friendlyName)

		const deviceClient = wemo.client(deviceInfo)

		deviceClient.on('error', err => logger.error('Error:', err.code))
		deviceClient.on('binaryState', value => logger.log(friendlyName, 'set to:', value))

		storeWemoDeviceClient(deviceInfo, deviceClient)
	})
)

const init = () => (
	discoverDevices()
)

const update = init

module.exports = {
	init,
	update,
	deviceClients,
}
