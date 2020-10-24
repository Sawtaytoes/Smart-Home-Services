const { filter, map, mapTo, mergeMap } = require('rxjs/operators')
const { of } = require('rxjs')

const { selectLockedLightIds } = require('$redux/lights/selectors')

const ignoreIfLockedLightIds = ({
	state$,
}) => (
	// TEMP filter. Might end up keeping it like this because commenting this out will give more immediate feedback.
	filter(Boolean)
	// mergeMap((
	// 	lightIds,
	// ) => (
	// 	of(
	// 		state$
	// 		.value
	// 	)
	// 	.pipe(
	// 		map(selectLockedLightIds()),
	// 		filter((
	// 			lockedLightIds,
	// 		) => (
	// 			!(
	// 				lightIds
	// 				.some((
	// 					lightId,
	// 				) => (
	// 					lockedLightIds
	// 					.has(lightId)
	// 				))
	// 			)
	// 		)),
	// 		mapTo(lightIds),
	// 	)
	// ))
)

module.exports = ignoreIfLockedLightIds
