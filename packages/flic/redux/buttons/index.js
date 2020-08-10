const { combineEpics } = require('redux-observable')

const buttonPressesEpic = require('./buttonPressesEpic')
const captureButtonPresses = require('./captureButtonPresses')
const executeButtonPressesEpic = require('./executeButtonPressesEpic')
const executeHttpCommandEpic = require('./executeHttpCommandEpic')
const executeWebSocketCommandEpic = require('./executeWebSocketCommandEpic')
const flicEventLoggerEpic = require('./flicEventLoggerEpic')
const requestsEpic = require('./requestsEpic')
const splitCommandsEpic = require('./splitCommandsEpic')
const startFlicClientEpic = require('./startFlicClientEpic')

const buttonsEpic = (
	combineEpics(
		buttonPressesEpic,
		captureButtonPresses,
		executeButtonPressesEpic,
		executeHttpCommandEpic,
		executeWebSocketCommandEpic,
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