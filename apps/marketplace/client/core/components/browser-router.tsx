import { useEffect, useRef, useState } from 'react'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { useEffectOnce } from 'ui/hooks/use-effect-once.js'
import type { ChildrenProp } from 'ui/typings/children-prop.js'

import { setPageTitle } from 'client/common/stores/page-store.js'
import { preloadRouteModel } from '../models/preload-route-model.js'

function BrowserRouter({ children }: ChildrenProp) {
	const { current: history } = useRef(createBrowserHistory({ window }))
	const [{ location, action }, setHistory] = useState({
		action: history.action,
		location: history.location,
	})

	// Set preload state on app bootstrap
	useEffectOnce(() => preloadRouteModel.updateSubject.next({ location, action }))

	// Handle history changes
	useEffect(() => {
		const unsubscribe = history.listen((update) => preloadRouteModel.updateSubject.next(update))
		return () => unsubscribe()
	}, [history])

	// Change current page
	useEffect(() => {
		const subscription = preloadRouteModel.preloadObs.subscribe(({ payload }) => {
			setHistory(history)
			setPageTitle(payload?.pageTitle)
			window.scrollTo(0, 0)
		})

		return () => subscription.unsubscribe()
	}, [history])

	return (
		<Router location={location} navigator={history}>
			{children}
		</Router>
	)
}

export default BrowserRouter
