const selectBinaryState = ({
	namespace,
}) => ({
	devices,
}) => (
	devices
	.binaryStateList
	.get(namespace)
)

const selectDeviceClient = ({
	namespace,
}) => ({
	devices,
}) => (
	devices
	.deviceClientList
	.get(namespace)
)

const selectWemoClient = () => ({
	devices,
}) => (
	devices
	.wemoClient
)

module.exports = {
	selectBinaryState,
	selectDeviceClient,
	selectWemoClient,
}
