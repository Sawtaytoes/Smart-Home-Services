const { filter, map, mapTo, mergeMap } = require('rxjs/operators')
const { of } = require('rxjs')

const { selectLockedLightIds } = require('$redux/lights/selectors')

const ignoreIfLockedLightIds = ({
	state$,
}) => (
	mergeMap((
		lightIds,
	) => (
		of(
			state$
			.value
		)
		.pipe(
			map(selectLockedLightIds()),
			filter((
				lockedLightIds,
			) => (
				!(
					lightIds
					.some((
						lightId,
					) => (
						lockedLightIds
						.has(lightId)
					))
				)
			)),
			mapTo(lightIds),
		)
	))
)

module.exports = ignoreIfLockedLightIds
