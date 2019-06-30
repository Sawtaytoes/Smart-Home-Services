const { createNamespaceReducer, createReducer } = require('@ghadyani-framework/redux-utils')
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
	createNamespaceReducer(
		createReducer(
			reducerActions,
			initialState,
		)
	)
)

module.exports = lightIdsGroupListReducer
