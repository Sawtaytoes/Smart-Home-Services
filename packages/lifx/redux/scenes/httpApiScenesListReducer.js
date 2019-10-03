const { ADD_HTTP_API_SCENES } = require('./actions')
const { createMergeById, createReducer } = require('@redux-observable-backend/redux-utils')

const mergeById = (
	createMergeById('id')
)

const initialState = []

const reducerActions = {
	[ADD_HTTP_API_SCENES]: (
		prevState,
		{ scenes },
	) => (
		mergeById(
			prevState,
			scenes,
		)
	),
}

const httpApiScenesListReducer = (
	createReducer(
		reducerActions,
		initialState,
	)
)

module.exports = httpApiScenesListReducer
