const { combineEpics } = require('redux-observable')

const addFlicClientEpic = require('./addFlicClientEpic')
const buttonPressesEpic = require('./buttonPressesEpic')
const captureButtonPresses = require('./captureButtonPresses')
const executeButtonPressesEpic = require('./executeButtonPressesEpic')
const executeHttpCommandEpic = require('./executeHttpCommandEpic')
const executeWebSocketCommandEpic = require('./executeWebSocketCommandEpic')
const flicClientErroredEpic = require('./flicClientErroredEpic')
const flicClientReadyEpic = require('./flicClientReadyEpic')
const flicClientTerminatedEpic = require('./flicClientTerminatedEpic')
const flicEventLoggerEpic = require('./flicEventLoggerEpic')
const newButtonAddedEpic = require('./newButtonAddedEpic')
const reconnectOnTeminationEpic = require('./reconnectOnTeminationEpic')
const requestsEpic = require('./requestsEpic')
const restartFlicClientEpic = require('./restartFlicClientEpic')
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
		flicClientErroredEpic,
		flicClientReadyEpic,
		flicClientTerminatedEpic,
		flicEventLoggerEpic,
		newButtonAddedEpic,
		reconnectOnTeminationEpic,
		requestsEpic,
		restartFlicClientEpic,
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
