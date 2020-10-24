const { combineEpics } = require('redux-observable')

const addFlicClientEpic = require('./addFlicClientEpic')
const buttonPressesEpic = require('./buttonPressesEpic')
const captureButtonPresses = require('./captureButtonPresses')
const executeButtonPressesEpic = require('./executeButtonPressesEpic')
const executeHttpCommandEpic = require('./executeHttpCommandEpic')
const executeWebSocketCommandEpic = require('./executeWebSocketCommandEpic')
const flicClientReadyEpic = require('./flicClientReadyEpic')
const flicClientReadyForRestartEpic = require('./flicClientReadyForRestartEpic')
const flicClientTerminatedEpic = require('./flicClientTerminatedEpic')
const flicEventLoggerEpic = require('./flicEventLoggerEpic')
const newButtonAddedEpic = require('./newButtonAddedEpic')
const requestsEpic = require('./requestsEpic')
const splitCommandsEpic = require('./splitCommandsEpic')
const startFlicClientEpic = require('./startFlicClientEpic')

const buttonsEpic = (
	combineEpics(
		addFlicClientEpic,
		buttonPressesEpic,
		captureButtonPresses,
		executeButtonPressesEpic,
		executeHttpCommandEpic,
		executeWebSocketCommandEpic,
		flicClientReadyEpic,
		flicClientReadyForRestartEpic,
		flicClientTerminatedEpic,
		flicEventLoggerEpic,
		newButtonAddedEpic,
		requestsEpic,
		splitCommandsEpic,
		startFlicClientEpic,
	)
)

module.exports = {
	buttons: {
		actions: require('./actions'),
	},
	buttonsEpic,
}
