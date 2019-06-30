const ADD_DEVICE = 'DEVICES::ADD_DEVICE'
const ADD_POWER_STATE = 'DEVICES::ADD_POWER_STATE'
const ADD_WEMO_CLIENT = 'DEVICES::ADD_WEMO_CLIENT'
const TOGGLE_DEVICE = 'DEVICES::TOGGLE_DEVICE'
const TOGGLE_DEVICES = 'DEVICES::TOGGLE_DEVICES'

const addDevice = (
	device,
) => ({
	device,
	namespace: device.friendlyName,
	type: ADD_DEVICE,
})

const addPowerState = ({
	namespace,
	powerState,
}) => ({
	namespace,
	powerState,
	type: ADD_POWER_STATE,
})

const addWemoClient = (
	wemoClient,
) => ({
	wemoClient,
	type: ADD_WEMO_CLIENT,
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
	ADD_DEVICE,
	ADD_POWER_STATE,
	ADD_WEMO_CLIENT,
	addDevice,
	addPowerState,
	addWemoClient,
	TOGGLE_DEVICE,
	TOGGLE_DEVICES,
	toggleDevice,
	toggleDevices,
}
