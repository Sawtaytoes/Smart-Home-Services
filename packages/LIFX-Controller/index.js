// Global Dir Hack
global.baseDir = `${__dirname}/`

// Load Config settings
const dir = require(`${global.baseDir}/global-dirs`)
const lifxConfig = require(`${dir.services}setup-lifx-config`)
const lifxClient = require(`${dir.services}setup-lifx-client`)
const setupServer = require(`${dir.server}setup-server`)
const startServer = require(`${dir.server}start-server`)

// Load Middleware
const discoverDevices = require(`${dir.middleware}discover-devices`)
const setLightsBrightness = require(`${dir.middleware}set-lights-brightness`)
const toggleGroup = require(`${dir.middleware}toggle-group`)
const toggleLights = require(`${dir.middleware}toggle-lights`)
const toggleScenes = require(`${dir.middleware}toggle-scenes`)

lifxClient.init()
lifxConfig.init()

const serverSettings = setupServer()

serverSettings.get(
	'/',
	(req, res) => res.end('You no be hearz.')
)

serverSettings.get(
	'/discover-devices',
	(req, res) => res.send(
		discoverDevices(lifxClient, lifxConfig)
	)
)

serverSettings.get(
	'/set-light-brightness/:lightName/:brightness',
	({ params: { brightness, lightName } }, res) => res.send(
		setLightsBrightness(lifxClient, lifxConfig)([{ brightness, lightName }])
	)
)

serverSettings.put(
	'/set-lights-brightness',
	({ body: { lightConfigs } }, res) => res.send(
		setLightsBrightness(lifxClient, lifxConfig)(lightConfigs)
	)
)

serverSettings.get(
	'/toggle-group/:groupName',
	({ params }, res) => res.send(
		toggleGroup(lifxClient, lifxConfig)(params.groupName)
	)
)

serverSettings.get(
	'/toggle-light/:lightName',
	({ params }, res) => res.send(
		toggleLights(lifxClient, lifxConfig)([params.lightName])
	)
)

serverSettings.put(
	'/toggle-lights',
	({ body }, res) => res.send(
		toggleLights(lifxClient, lifxConfig)(body.lightNames)
	)
)

serverSettings.get(
	'/toggle-scene/:sceneName',
	({ params }, res) => res.send(
		toggleScenes(lifxClient, lifxConfig)([params.sceneName])
	)
)

serverSettings.put(
	'/toggle-scenes',
	({ body }, res) => res.send(
		toggleScenes(lifxClient, lifxConfig)(body.sceneNames)
	)
)

startServer(serverSettings)

const DEVICE_DISCOVERY_INTERVAL = 600000 // 10 minutes

setInterval(
	() => discoverDevices(lifxClient, lifxConfig),
	DEVICE_DISCOVERY_INTERVAL
)
