const { createMappedNamespaceReducer, createReducer } = require('@redux-observable-backend/redux-utils')

const {
	ADD_DEVICE,
	REMOVE_DEVICE,
} = require('./actions')

const initialState = null

const reducerActions = {
	[ADD_DEVICE]: (
		prevState,
		{ device },
	) => (
		device
	),

	[REMOVE_DEVICE]: () => (
		initialState
	),
}

const devicesListReducer = (
	createMappedNamespaceReducer(
		createReducer(
			reducerActions,
			initialState,
		)
	)
)

module.exports = devicesListReducer
