// Global Dir Hack
global.baseDir = `${__dirname}/`

// Load Config settings
const dir = require(`${global.baseDir}directories`)
const wemoClient = require(`${dir.services}wemoClient`)
const setupServer = require(`${dir.server}setupServer`)
const startServer = require(`${dir.server}startServer`)

// Load Middleware
const toggleDevices = require(`${dir.middleware}toggleDevices`)
const turnOffDevices = require(`${dir.middleware}turnOffDevices`)
const turnOnDevices = require(`${dir.middleware}turnOnDevices`)

wemoClient.init()

const serverSettings = setupServer()

serverSettings.get(
	'/',
	(req, res) => res.end('You no be hearz.')
)

serverSettings.get(
	'/toggle-device/:name',
	(req, res) => res.send(
		toggleDevices(wemoClient)([req.params.name])
	)
)

serverSettings.put(
	'/toggle-device',
	(req, res) => res.send(
		toggleDevices(wemoClient)(req.body.names)
	)
)

serverSettings.get(
	'/turn-off-device/:name',
	(req, res) => res.send(
		turnOffDevices(wemoClient)([req.params.name])
	)
)

serverSettings.put(
	'/turn-off-device',
	(req, res) => res.send(
		turnOffDevices(wemoClient)(req.body.names)
	)
)

serverSettings.get(
	'/turn-on-device/:name',
	(req, res) => res.send(
		turnOnDevices(wemoClient)([req.params.name])
	)
)

serverSettings.put(
	'/turn-on-device',
	(req, res) => res.send(
		turnOnDevices(wemoClient)(req.body.names)
	)
)

startServer(serverSettings)
