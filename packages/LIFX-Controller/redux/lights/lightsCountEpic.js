const { ignoreElements, map, switchMap, auditTime, tap } = require('rxjs/operators')
const { ofType } = require('redux-observable')
const { stateSelector } = require('@ghadyani-framework/redux-utils')

const { ADD_LIGHT } = require('./actions')

const lightsCountEpic = (
	(action$, state$) => (
		action$
		.pipe(
			ofType(ADD_LIGHT),
			auditTime(300),
			switchMap(() => (
				stateSelector({
					selector: (
						({ lights }) => (
							lights
							.lightsList
						)
					),
					state$,
				})
			)),
			map(lightsList => lightsList.size),
			tap(console.log),
			ignoreElements(),
		)
	)
)

module.exports = lightsCountEpic
