const Promise = require('bluebird')

const dir = require(`${global.baseDir}global-dirs`)
const logger = require(`${dir.utils}logger`)

const POWERED_OFF = 0
const POWERED_ON = 1

const getDeviceClient = deviceClients => deviceName => deviceClients.get(deviceName)

const isPoweredOn = state => Number(state) === POWERED_ON
const getPoweredOnDevices = deviceClientStates => (
	deviceClientStates
	.filter(isPoweredOn)
)

const getCurrentState = deviceClient => (
	Promise.promisify(deviceClient.getBinaryState, { context: deviceClient })()
)

const powerOffDevice = deviceClient => (
	Promise.promisify(deviceClient.setBinaryState, { context: deviceClient })(POWERED_OFF)
)

const turnOffDevices = deviceClients => () => (
	Promise.all(
		deviceClients
		.map(powerOffDevice)
	)
)

module.exports = ({ deviceClients }) => deviceNames => {
	logger.log(`Command: Toggle Devices => ${deviceNames}`)

	const selectedDeviceClients = (
		deviceNames
		.map(getDeviceClient(deviceClients))
		.filter(Boolean)
	)

	if (!selectedDeviceClients.length) return 'No Devices exist under those names.'

	Promise.all(
		selectedDeviceClients
		.map(getCurrentState)
	)
	.then(getPoweredOnDevices)
	.then(turnOffDevices(selectedDeviceClients))
	.then(() => logger.log('Device states successfully changed.'))
	.catch(err => logger.logError(err))
}
