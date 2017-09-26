// Global Dir Hack
global.baseDir = `${__dirname}/`

// Load Config settings
const dir = require(`${global.baseDir}global-dirs`)
const wemoClient = require(`${dir.services}setup-wemo-client`)
const setupServer = require(`${dir.server}setup-server`)
const startServer = require(`${dir.server}start-server`)

// Load Middleware
const toggleDevices = require(`${dir.middleware}toggle-devices`)
const turnOffDevices = require(`${dir.middleware}turn-off-devices`)
const turnOnDevices = require(`${dir.middleware}turn-on-devices`)

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
	'/toggle-devices',
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
	'/turn-off-devices',
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
	'/turn-on-devices',
	(req, res) => res.send(
		turnOnDevices(wemoClient)(req.body.names)
	)
)

startServer(serverSettings)
