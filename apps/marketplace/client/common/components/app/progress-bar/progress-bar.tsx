import { memo } from 'react'
import { cn } from 'ui/helpers/class-names.js'

import { useSubscription } from 'client/common/hooks/use-subscription.js'
import { preloadRouteModel } from 'client/core/models/preload-route-model.js'
import { QueryStatus } from 'client/core/models/query-model.js'
import './progress-bar.css'

function ProgressBar() {
	const { status } = useSubscription(preloadRouteModel.preloadQuery.queryObs)

	return (
		<hr
			className={cn(
				'm-progress-bar',
				status === QueryStatus.loading && 'm-loading',
				status === QueryStatus.success && 'm-loading-end',
			)}
		/>
	)
}

export default memo(ProgressBar)
