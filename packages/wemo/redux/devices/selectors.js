const selectDevice = ({
	namespace,
}) => ({
	devices,
}) => (
	devices
	.devicesList
	.get(namespace)
)

const selectPowerState = ({
	namespace,
}) => ({
	devices,
}) => (
	devices
	.powerStatesList
	.get(namespace)
)

const selectWemoClient = () => ({
	devices,
}) => (
	devices
	.wemoClient
)

module.exports = {
	selectDevice,
	selectPowerState,
	selectWemoClient,
}
