const { createReducer } = require('@redux-observable-backend/redux-utils')

const { ADD_WEMO_CLIENT } = require('./actions')

const initialState = null

const reducerActions = {
	[ADD_WEMO_CLIENT]: (
		prevState,
		{ wemoClient },
	) => (
		wemoClient
	),
}

const wemoClientReducer = (
	createReducer(
		reducerActions,
		initialState,
	)
)

module.exports = wemoClientReducer
