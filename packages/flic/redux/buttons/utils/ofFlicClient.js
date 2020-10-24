const { filter } = require('rxjs/operators')

const ofFlicClient = (
	expectedFlicClient,
) => (
	filter(({
		flicClient,
	}) => (
		Object.is(
			expectedFlicClient,
			flicClient,
		)
	))
)

module.exports = ofFlicClient
