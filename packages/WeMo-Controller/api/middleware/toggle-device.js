const Promise = require('bluebird')
const Wemo = require('wemo-client')

const dir = require(`${global.baseDir}/global-dirs`)
const logger = require(`${dir.utils}/logger`)

const getCurrentState = deviceClient => (
	Promise.promisify(deviceClient.getBinaryState, { context: deviceClient })()
)

const toggleDevice = deviceClient => binaryState => (
	deviceClient.setBinaryState(Number(!Number(binaryState)))
)

module.exports = ({ deviceClients }) => deviceName => {
	logger.log(`Command: Toggle Device => ${deviceName}`)

	const deviceClient = deviceClients.get(deviceName)

	if (!deviceClient) return 'Device does not exist.'

	Promise.resolve(getCurrentState(deviceClient))
	.then(toggleDevice(deviceClient))
	.catch(err => console.error(err))
}
