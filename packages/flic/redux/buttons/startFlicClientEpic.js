const { catchEpicError } = require('@redux-observable-backend/redux-utils')
const { configurations, ofTaskName, tasks } = require('@redux-observable-backend/node')
const { FlicClient } = require('fliclib/clientlib/nodejs/fliclibNodeJs')
const { map, switchMap } = require('rxjs/operators')
const { ofType } = require('redux-observable')

const { addedFlicClient } = require('./actions')

const startFlicClientEpic = (
	action$,
	state$,
) => (
	action$
	.pipe(
		ofType(
			tasks
			.actions
			.START_TASK
		),
		ofTaskName(
			'listen',
			'undefined',
		),
		map(() => state$.value),
		map(
			configurations
			.selectors
			.selectConfigurationSet()
		),
		switchMap(({ flicButtonServers }) => (
			flicButtonServers
		)),
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
		})),
		map(addedFlicClient),
		catchEpicError(),
	)
)

module.exports = startFlicClientEpic
