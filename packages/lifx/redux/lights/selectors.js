const selectHttpApiLights = () => ({
	lights,
}) => (
	lights
	.httpApiLightsList
)

const selectLockedLightIds = () => ({
	lights,
}) => (
	lights
	.lockedLightIdsList
)

const selectNetworkLight = ({
	lightId,
}) => ({
	lights,
}) => (
	lights
	.networkLightsList
	.find(({ id }) => (
		id === lightId
	))
)

const selectNetworkLights = () => ({
	lights,
}) => (
	lights
	.networkLightsList
)

module.exports = {
	selectHttpApiLights,
	selectLockedLightIds,
	selectNetworkLight,
	selectNetworkLights,
}
