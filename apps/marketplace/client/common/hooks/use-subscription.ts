import { useEffect, useState } from 'react'
import type { Observable } from 'rxjs'

export function useSubscription<T>(observable: Observable<T>): T | undefined {
	const [state, setState] = useState<T>()

	useEffect(() => {
		const subscription = observable.subscribe((value) => {
			setState(value)
		})

		return () => {
			subscription.unsubscribe()
		}
	}, [observable])

	return state
}
