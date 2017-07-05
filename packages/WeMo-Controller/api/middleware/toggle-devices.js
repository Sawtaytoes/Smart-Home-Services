const Promise = require('bluebird')

const dir = require(`${global.baseDir}/global-dirs`)
const logger = require(`${dir.utils}/logger`)

const POWERED_OFF = 0
const POWERED_ON = 1

const isDeviceOnline = deviceClient => deviceClient

const getDeviceClient = deviceClients => deviceName => deviceClients.get(deviceName)

const getNextState = deviceClientStates => Number(!deviceClientStates.some(state => Number(state) === POWERED_ON))

const getCurrentState = deviceClient => (
	Promise.promisify(deviceClient.getBinaryState, { context: deviceClient })()
)

const powerOffDevice = deviceClient => (
	Promise.promisify(deviceClient.setBinaryState, { context: deviceClient })(POWERED_OFF)
)

const powerOnDevice = deviceClient => (
	Promise.promisify(deviceClient.setBinaryState, { context: deviceClient })(POWERED_ON)
)

const changeDeviceState = state => (
	state === POWERED_OFF
	? powerOffDevice
	: powerOnDevice
)

const toggleDevices = deviceClients => nextState => (
	Promise.all(
		deviceClients
		.map(changeDeviceState(nextState))
	)
)

module.exports = ({ deviceClients }) => deviceNames => {
	logger.log(`Command: Toggle Devices => ${deviceNames}`)

	const selectedDeviceClients = (
		deviceNames
		.map(getDeviceClient(deviceClients))
		.filter(isDeviceOnline)
	)

	if (!selectedDeviceClients.length) return 'No Devices exist under those names.'

	Promise.all(
		selectedDeviceClients
		.map(getCurrentState)
	)
	.then(getNextState)
	.then(toggleDevices(selectedDeviceClients))
	.then(() => logger.log('Device states successfully changed.'))
	.catch(err => logger.logError(err))
}
