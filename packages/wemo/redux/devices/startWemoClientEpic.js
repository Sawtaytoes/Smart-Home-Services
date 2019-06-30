const WemoClient = require('wemo-client')
const { catchEpicError } = require('@redux-observable-backend/redux-utils')
const { interval } = require('rxjs')
const { map, startWith, switchMap } = require('rxjs/operators')
const { ofTaskName, tasks } = require('@redux-observable-backend/node')
const { ofType } = require('redux-observable')

const { addWemoClient } = require('./actions')

const startWemoClientEpic = (
	action$,
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
		switchMap(() => (
			interval(3600000)
			.pipe(
				startWith(null),
				map(() => (
					new WemoClient()
				)),
				map(addWemoClient),
			)
		)),
		catchEpicError(),
	)
)

module.exports = startWemoClientEpic
