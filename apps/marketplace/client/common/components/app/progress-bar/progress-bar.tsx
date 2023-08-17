import { memo } from 'react'
import { cn } from 'ui/helpers/class-names.js'

import { useStore } from 'client/common/hooks/use-store.js'
import { QueryStatus } from 'client/core/models/query-model.js'
import { preloadingQueryStore } from 'client/core/models/router-model.js'
import './progress-bar.css'

function ProgressBar() {
	const { status } = useStore(preloadingQueryStore)

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
