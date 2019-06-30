const { createMappedNamespaceReducer, createReducer } = require('@redux-observable-backend/redux-utils')

const {
	ADD_BINARY_STATE,
	REMOVE_BINARY_STATE,
} = require('./actions')

const initialState = null

const reducerActions = {
	[ADD_BINARY_STATE]: (
		prevState,
		{ binaryState },
	) => (
		binaryState
	),

	[REMOVE_BINARY_STATE]: () => (
		initialState
	),
}

const binaryStateListReducer = (
	createMappedNamespaceReducer(
		createReducer(
			reducerActions,
			initialState,
		)
	)
)

module.exports = binaryStateListReducer
