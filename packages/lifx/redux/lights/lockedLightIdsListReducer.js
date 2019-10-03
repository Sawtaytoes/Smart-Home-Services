const { createReducer } = require('@redux-observable-backend/redux-utils')
const { LOCK_LIGHTS, UNLOCK_LIGHTS } = require('./actions')

const initialState = new Set()

const reducerActions = {
	[LOCK_LIGHTS]: (
		(
			prevState,
			{ lightIds },
		) => (
			new Set([
				...prevState,
				...lightIds,
			])
		)
	),
	[UNLOCK_LIGHTS]: (
		(
			prevState,
			{ lightIds },
		) => (
			lightIds
			.reduce(
				(
					state,
					lightId,
				) => {
					const nextState = (
						new Set(state)
					)

					nextState
					.delete(lightId)

					return nextState
				},
				prevState,
			)
		)
	),
}

const lockedLightIdsListReducer = (
	createReducer(
		reducerActions,
		initialState,
	)
)

module.exports = lockedLightIdsListReducer
