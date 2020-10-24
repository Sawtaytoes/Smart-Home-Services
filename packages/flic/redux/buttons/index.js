const { combineEpics } = require('redux-observable')

const addFlicClientEpic = require('./addFlicClientEpic')
const buttonPressesEpic = require('./buttonPressesEpic')
const captureButtonPresses = require('./captureButtonPresses')
const executeButtonPressesEpic = require('./executeButtonPressesEpic')
const executeHttpCommandEpic = require('./executeHttpCommandEpic')
const executeWebSocketCommandEpic = require('./executeWebSocketCommandEpic')
const flicClientReadyEpic = require('./flicClientReadyEpic')
const flicClientTerminatedEpic = require('./flicClientTerminatedEpic')
const flicEventLoggerEpic = require('./flicEventLoggerEpic')
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
		flicClientTerminatedEpic,
		flicEventLoggerEpic,
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
