const ADDED_FLIC_CLIENT = 'BUTTON_PRESSES::ADDED_FLIC_CLIENT'
const CAPTURE_BUTTON_PRESSES = 'BUTTON_PRESSES::CAPTURE_BUTTON_PRESSES'
const EXECUTE_BUTTON_PRESSES = 'BUTTON_PRESSES::EXECUTE_BUTTON_PRESSES'
const EXECUTE_COMMAND = 'BUTTON_PRESSES::EXECUTE_COMMAND'
const FLIC_CLIENT_TERMINATED = 'BUTTON_PRESSES::FLIC_CLIENT_TERMINATED'
const FLIC_CLIENT_READY = 'BUTTON_PRESSES::FLIC_CLIENT_READY'
const SPLIT_COMMANDS = 'BUTTON_PRESSES::SPLIT_COMMANDS'

const addedFlicClient = ({
	flicClient,
	hostname,
}) => ({
	flicClient,
	hostname,
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

const flicClientReady = ({
	flicClient,
	hostname,
}) => ({
	flicClient,
	hostname,
	type: FLIC_CLIENT_READY,
})

const flicClientTerminated = ({
	flicClient,
}) => ({
	flicClient,
	type: FLIC_CLIENT_TERMINATED,
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

module.exports = {
	ADDED_FLIC_CLIENT,
	addedFlicClient,
	CAPTURE_BUTTON_PRESSES,
	captureButtonPresses,
	EXECUTE_BUTTON_PRESSES,
	EXECUTE_COMMAND,
	executeButtonPresses,
	executeCommand,
	FLIC_CLIENT_TERMINATED,
	FLIC_CLIENT_READY,
	flicClientTerminated,
	flicClientReady,
	SPLIT_COMMANDS,
	splitCommands,
}
