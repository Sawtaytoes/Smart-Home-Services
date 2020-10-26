const { filter, takeUntil } = require('rxjs/operators')
const { ofType } = require('redux-observable')

const { RESTART_FLIC_CLIENT } = require('./actions')

const takeUntilFlicClientTerminated = ({
	action$,
	flicClient,
}) => (
	takeUntil(
		action$
		.pipe(
			ofType(RESTART_FLIC_CLIENT),
			filter(({
				flicClient: terminatedFlicClient,
			}) => (
				Object.is(
					terminatedFlicClient,
					flicClient,
				)
			))
		)
	)
)

module.exports = takeUntilFlicClientTerminated
