const ADDED_FLIC_CLIENT = 'BUTTON_PRESSES::ADDED_FLIC_CLIENT'
const CAPTURE_BUTTON_PRESSES = 'BUTTON_PRESSES::CAPTURE_BUTTON_PRESSES'
const EXECUTE_BUTTON_PRESSES = 'BUTTON_PRESSES::EXECUTE_BUTTON_PRESSES'
const EXECUTE_COMMAND = 'BUTTON_PRESSES::EXECUTE_COMMAND'
const RESTART_FLIC_CLIENT = 'BUTTON_PRESSES::RESTART_FLIC_CLIENT'
const SPLIT_COMMANDS = 'BUTTON_PRESSES::SPLIT_COMMANDS'
const START_FLIC_CLIENT = 'BUTTON_PRESSES::START_FLIC_CLIENT'

const addedFlicClient = ({
	flicClient,
	hostname,
	port,
}) => ({
	flicClient,
	hostname,
	port,
	type: ADDED_FLIC_CLIENT,
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

const executeCommand = ({
	action,
	device,
	names,
}) => ({
	action,
	device,
	names,
	type: EXECUTE_COMMAND,
})

const restartFlicClient = ({
	flicClient,
	hostname,
	port,
}) => ({
	flicClient,
	hostname,
	port,
	type: RESTART_FLIC_CLIENT,
})

const splitCommands = (
	actionSets,
) => ({
	actionSets: (
		(
			Array
			.isArray(actionSets)
		)
		? actionSets
		: [actionSets]
	),
	type: SPLIT_COMMANDS,
})

const startFlicClient = ({
	hostname,
	port,
}) => ({
	hostname,
	port,
	type: START_FLIC_CLIENT,
})

module.exports = {
	ADDED_FLIC_CLIENT,
	addedFlicClient,
	CAPTURE_BUTTON_PRESSES,
	captureButtonPresses,
	EXECUTE_BUTTON_PRESSES,
	EXECUTE_COMMAND,
	executeButtonPresses,
	executeCommand,
	RESTART_FLIC_CLIENT,
	restartFlicClient,
	SPLIT_COMMANDS,
	splitCommands,
	START_FLIC_CLIENT,
	startFlicClient,
}
