import { memo, useEffect, useState } from 'react'
import { cn } from '@acme/ui/helpers/class-names.js'
import { useMountedState } from '@acme/ui/hooks/use-mounted-state.js'
import { debounce, of, timer } from 'rxjs'

import { preloadRouteObs } from 'client/core/models/router-model.js'
import './progress-bar.css'

function ProgressBar() {
	const [isLoading, setIsLoading] = useState(false)
	const isMounted = useMountedState()

	// Show loading status only if it is longer than 250ms
	useEffect(() => {
		const subscription = preloadRouteObs
			.pipe(debounce((route) => (route.loading ? timer(250) : of(route))))
			.subscribe((route) => {
				setIsLoading(route.loading)
			})

		return () => {
			subscription.unsubscribe()
		}
	}, [])

	return (
		<hr
			className={cn(
				'm-progress-bar',
				(!isMounted || isLoading) && 'm-loading',
				isMounted && !isLoading && 'm-loading-end',
			)}
		/>
	)
}

export default memo(ProgressBar)
