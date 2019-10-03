const ADD_HTTP_API_LIGHTS = 'LIGHTS::ADD_HTTP_API_LIGHTS'
const ADD_NETWORK_LIGHTS = 'LIGHTS::ADD_NETWORK_LIGHTS'
const LOCK_LIGHTS = 'LIGHTS::LOCK_LIGHTS'
const REMOVE_NETWORK_LIGHT = 'LIGHTS::REMOVE_NETWORK_LIGHT'
const UNLOCK_LIGHTS = 'LIGHTS::UNLOCK_LIGHTS'

const addHttpApiLights = (
	lights,
) => ({
	lights,
	type: ADD_HTTP_API_LIGHTS,
})

const addNetworkLights = (
	lights,
) => ({
	lights,
	type: ADD_NETWORK_LIGHTS,
})

const lockLights = (
	lightIds,
) => ({
	lightIds,
	type: LOCK_LIGHTS,
})

const removeNetworkLight = ({
	light,
}) => ({
	light,
	type: REMOVE_NETWORK_LIGHT,
})

const unlockLights = (
	lightIds,
) => ({
	lightIds,
	type: UNLOCK_LIGHTS,
})

module.exports = {
	ADD_HTTP_API_LIGHTS,
	ADD_NETWORK_LIGHTS,
	addHttpApiLights,
	addNetworkLights,
	LOCK_LIGHTS,
	lockLights,
	REMOVE_NETWORK_LIGHT,
	removeNetworkLight,
	UNLOCK_LIGHTS,
	unlockLights,
}
