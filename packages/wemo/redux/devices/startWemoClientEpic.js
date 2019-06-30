const WemoClient = require('wemo-client')
const { interval } = require('rxjs')
const { map, startWith, switchMap } = require('rxjs/operators')
const { ofTaskName } = require('@ghadyani-framework/node')
const { ofType } = require('redux-observable')
const { START_TASK } = require('@ghadyani-framework/node/redux/tasks/actions')

const { addWemoClient } = require('./actions')

const startWemoClientEpic = (
	action$,
) => (
	action$
	.pipe(
		ofType(START_TASK),
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
	)
)

module.exports = startWemoClientEpic
