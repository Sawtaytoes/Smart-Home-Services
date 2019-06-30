const ADD_BINARY_STATE = 'DEVICES::ADD_BINARY_STATE'
const ADD_DEVICE_CLIENT = 'DEVICES::ADD_DEVICE_CLIENT'
const ADD_WEMO_CLIENT = 'DEVICES::ADD_WEMO_CLIENT'
const REMOVE_BINARY_STATE = 'DEVICES::REMOVE_BINARY_STATE'
const REMOVE_DEVICE_CLIENT = 'DEVICES::REMOVE_DEVICE_CLIENT'
const TOGGLE_DEVICE = 'DEVICES::TOGGLE_DEVICE'
const TOGGLE_DEVICES = 'DEVICES::TOGGLE_DEVICES'

const addBinaryState = ({
	binaryState,
	namespace,
}) => ({
	binaryState,
	namespace,
	type: ADD_BINARY_STATE,
})

const addDeviceClient = (
	deviceClient,
) => ({
	deviceClient,
	namespace: (
		deviceClient
		.device
		.friendlyName
	),
	type: ADD_DEVICE_CLIENT,
})

const addWemoClient = (
	wemoClient,
) => ({
	wemoClient,
	type: ADD_WEMO_CLIENT,
})

const removeBinaryState = ({
	namespace,
}) => ({
	namespace,
	type: REMOVE_BINARY_STATE,
})

const removeDeviceClient = ({
	namespace,
}) => ({
	namespace,
	type: REMOVE_DEVICE_CLIENT,
})

const toggleDevice = (
	deviceNames,
) => ({
	deviceNames,
	type: TOGGLE_DEVICE,
})

const toggleDevices = (
	deviceNames,
) => ({
	deviceNames,
	type: TOGGLE_DEVICES,
})

module.exports = {
	ADD_BINARY_STATE,
	ADD_DEVICE_CLIENT,
	ADD_WEMO_CLIENT,
	addBinaryState,
	addDeviceClient,
	addWemoClient,
	REMOVE_BINARY_STATE,
	REMOVE_DEVICE_CLIENT,
	removeBinaryState,
	removeDeviceClient,
	TOGGLE_DEVICE,
	TOGGLE_DEVICES,
	toggleDevice,
	toggleDevices,
}
