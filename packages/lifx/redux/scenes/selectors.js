const selectHttpApiScenes = () => ({
	scenes,
}) => (
	scenes
	.httpApiScenesList
)

const selectScene = ({
	sceneName,
}) => ({
	scenes,
}) => (
	scenes
	.scenesList
	.get(sceneName)
)

module.exports = {
	selectHttpApiScenes,
	selectScene,
}
