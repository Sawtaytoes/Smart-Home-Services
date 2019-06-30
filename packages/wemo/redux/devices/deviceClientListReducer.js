const { createMappedNamespaceReducer, createReducer } = require('@redux-observable-backend/redux-utils')

const {
	ADD_DEVICE_CLIENT,
	REMOVE_DEVICE_CLIENT,
} = require('./actions')

const initialState = null

const reducerActions = {
	[ADD_DEVICE_CLIENT]: (
		prevState,
		{ deviceClient },
	) => (
		deviceClient
	),

	[REMOVE_DEVICE_CLIENT]: () => (
		initialState
	),
}

const deviceClientListReducer = (
	createMappedNamespaceReducer(
		createReducer(
			reducerActions,
			initialState,
		)
	)
)

module.exports = deviceClientListReducer
