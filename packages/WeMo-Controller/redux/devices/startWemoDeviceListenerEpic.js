const { bindNodeCallback, of } = require('rxjs')
const { catchError, ignoreElements, map, mergeMap, switchMap, tap } = require('rxjs/operators')
const { ofType } = require('redux-observable')

const {
	ADD_WEMO_CLIENT,
} = require('./actions')

const startWemoDeviceListenerEpic = (
	action$,
) => (
	action$
	.pipe(
		ofType(ADD_WEMO_CLIENT),
		mergeMap(({
			wemoClient,
		}) => (
			bindNodeCallback(
				wemoClient
				.discover
				.bind(wemoClient)
			)()
			.pipe(
				// switchMap(() => (
				// 	bindNodeCallback(
				// 		wemoClient
				// 		.getInfo
				// 		.bind(wemoClient)
				// 	)()
				// )),
				tap(console.log),
				catchError(error => (
					console.log(error)|| // TEMP
					of({ error, type: 'SOME_ERROR' })
				)),
			)
		)),
		ignoreElements(),
	)
)

module.exports = startWemoDeviceListenerEpic
