const { catchEpicError } = require('@redux-observable-backend/redux-utils')
const { configurations, ofTaskName, tasks } = require('@redux-observable-backend/node')
const { map, switchMap } = require('rxjs/operators')
const { ofType } = require('redux-observable')

const { startFlicClient } = require('./actions')

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
		switchMap(({
			flicButtonServers,
		}) => (
			flicButtonServers
		)),
		map(startFlicClient),
		catchEpicError(),
	)
)

module.exports = startFlicClientEpic
