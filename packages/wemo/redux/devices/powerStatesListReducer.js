const { createMappedNamespaceReducer, createReducer } = require('@redux-observable-backend/redux-utils')

const {
	ADD_POWER_STATE,
	// REMOVE_POWER_STATE,
} = require('./actions')

const initialState = null

const reducerActions = {
	[ADD_POWER_STATE]: (
		prevState,
		{ powerState },
	) => (
		powerState
	),

	// [REMOVE_POWER_STATE]: () => (
	// 	initialState
	// ),
}

const powerStatesListReducer = (
	createMappedNamespaceReducer(
		createReducer(
			reducerActions,
			initialState,
		)
	)
)

module.exports = powerStatesListReducer
