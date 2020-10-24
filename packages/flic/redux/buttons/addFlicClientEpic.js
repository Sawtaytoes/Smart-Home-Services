const { catchEpicError } = require('@redux-observable-backend/redux-utils')
const { FlicClient } = require('fliclib/clientlib/nodejs/fliclibNodeJs')
const { map } = require('rxjs/operators')
const { ofType } = require('redux-observable')

const { addedFlicClient, START_FLIC_CLIENT } = require('./actions')

const addFlicClientEpic = (
	action$,
) => (
	action$
	.pipe(
		ofType(START_FLIC_CLIENT),
		map(({
			hostname,
			port,
		}) => ({
			flicClient: (
				new FlicClient(
					hostname,
					port,
				)
			),
			hostname,
			port,
		})),
		map(addedFlicClient),
		catchEpicError(),
	)
)

module.exports = addFlicClientEpic
