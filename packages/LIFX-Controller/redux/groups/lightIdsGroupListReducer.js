const { createMappedNamespaceReducer, createReducer } = require('@redux-observable-backend/redux-utils')
const { ADD_GROUP } = require('./actions')

const initialState = new Set()

const reducerActions = {
	[ADD_GROUP]: (
		(prevState, { lightId }) => (
			new Set(prevState)
			.add(lightId)
		)
	),
}

const lightIdsGroupListReducer = (
	createMappedNamespaceReducer(
		createReducer(
			reducerActions,
			initialState,
		)
	)
)

module.exports = lightIdsGroupListReducer
