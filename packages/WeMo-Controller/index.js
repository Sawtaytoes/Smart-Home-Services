// Global Dir Hack
global.baseDir = `${__dirname}/`

// Load Config settings
const dir = require(`${global.baseDir}/global-dirs`)
const wemoClient = require(`${dir.services}setup-wemo-client`)
const setupServer = require(`${dir.server}setup-server`)
const startServer = require(`${dir.server}start-server`)

// Load Middleware
const toggleDevice = require(`${dir.middleware}toggle-device`)

wemoClient.init()

const serverSettings = setupServer()

serverSettings.get(
	'/',
	(req, res) => res.end('You no be hearz.')
)

serverSettings.get(
	'/toggle-device/:name',
	(req, res) => res.send(
		toggleDevice(wemoClient)(req.params.name)
	)
)

startServer(serverSettings)
