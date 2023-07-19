import { memo, useState } from 'react'
import { delay, filter, tap } from 'rxjs'
import { cn } from 'ui/helpers/class-names.js'

import { useEffectOnce } from 'client/common/hooks/use-effect-once.js'
import { useEnhancedEffect } from 'client/common/hooks/use-enhanced-effect.js'
import { useSubscription } from 'client/common/hooks/use-subscription.js'
import { preloadRouteModel } from 'client/core/components/preload-route.model.js'
import { QueryStatuses } from 'client/core/query.model.js'
import './progress-bar.css'

const LOADING_TRANSITION_DELAY = 500

function ProgressBar() {
	const [prehydrationLoading, setPrehydrationLoading] = useState(true)
	const { status } = useSubscription(preloadRouteModel.queryObs)

	useEnhancedEffect(() => {
		const subscriprion = preloadRouteModel.queryObs
			.pipe(
				filter((state) => state.status === QueryStatuses.SUCCESS),
				delay(LOADING_TRANSITION_DELAY),
				tap(() => preloadRouteModel.reset()),
			)
			.subscribe()

		return () => subscriprion.unsubscribe()
	}, [])

	useEffectOnce(() => setPrehydrationLoading(false))

	return (
		<div
			className={cn(
				'wrapper',
				(prehydrationLoading || status === QueryStatuses.LOADING) && 'loading',
				((!prehydrationLoading && status === QueryStatuses.IDLE) ||
					status === QueryStatuses.SUCCESS) &&
					'loading-end',
			)}
		/>
	)
}

export default memo(ProgressBar)
