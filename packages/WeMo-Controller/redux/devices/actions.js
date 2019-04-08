const ADD_WEMO_CLIENT = 'BUTTON_PRESSES::ADD_WEMO_CLIENT'
const CAPTURE_BUTTON_PRESSES = 'BUTTON_PRESSES::CAPTURE_BUTTON_PRESSES'
const EXECUTE_BUTTON_PRESSES = 'BUTTON_PRESSES::EXECUTE_BUTTON_PRESSES'
const EXECUTE_COMMAND = 'BUTTON_PRESSES::EXECUTE_COMMAND'

const addWemoClient = (
	wemoClient,
) => ({
	wemoClient,
	type: ADD_WEMO_CLIENT,
})

const captureButtonPresses = ({
	bluetoothAddress,
	buttonPressStates,
	hostname,
}) => ({
	buttonId: bluetoothAddress,
	buttonPressStates,
	hostname,
	type: CAPTURE_BUTTON_PRESSES,
})

const executeButtonPresses = ({
	buttonId,
	connection,
	pressCount,
	pressType,
}) => ({
	buttonId,
	connection,
	pressCount,
	pressType,
	type: EXECUTE_BUTTON_PRESSES,
})

const executeCommand = (
	actionSets,
) => ({
	actionSets,
	type: EXECUTE_COMMAND,
})

module.exports = {
	ADD_WEMO_CLIENT,
	addWemoClient,
	CAPTURE_BUTTON_PRESSES,
	captureButtonPresses,
	EXECUTE_BUTTON_PRESSES,
	EXECUTE_COMMAND,
	executeButtonPresses,
	executeCommand,
}
