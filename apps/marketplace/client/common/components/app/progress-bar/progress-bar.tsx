import { memo, useEffect, useState } from 'react'
import { cn } from '@acme/ui/helpers/class-names.js'

import { useStore } from 'client/common/hooks/use-store.js'
import { QueryStatus } from 'client/core/models/query-model.js'
import { preloadingQuery } from 'client/core/models/router-model.js'
import './progress-bar.css'

function ProgressBar() {
	const [isMounted, setIsMounted] = useState(false)
	const { status } = useStore(preloadingQuery.store)

	useEffect(() => {
		setIsMounted(true)
	}, [])

	return (
		<hr
			className={cn(
				'm-progress-bar',
				(!isMounted || status === QueryStatus.loading) && 'm-loading',
				isMounted && status !== QueryStatus.loading && 'm-loading-end',
			)}
		/>
	)
}

export default memo(ProgressBar)
