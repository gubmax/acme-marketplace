import { useRef, useState } from 'react'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { useEffectOnce } from 'ui/hooks/use-effect-once.js'
import type { ChildrenProp } from 'ui/typings/children-prop.js'

import { useEnhancedEffect } from 'client/common/hooks/use-enhanced-effect.js'
import { setPageTitle } from 'client/common/stores/page-store.js'
import { preloadRouteModel } from '../models/preload-route.model.js'

function BrowserRouter({ children }: ChildrenProp) {
	const { current: history } = useRef(createBrowserHistory({ window }))
	const [{ location }, setHistory] = useState({
		action: history.action,
		location: history.location,
	})

	useEnhancedEffect(() => {
		const unsubscribe = history.listen((update) => {
			if (update.location.pathname !== location.pathname)
				preloadRouteModel.updateSubject.next(update)
		})

		return () => unsubscribe()
	}, [history, location.pathname])

	useEffectOnce(() => {
		const subscription = preloadRouteModel.preloadObs.subscribe(({ update, payload }) => {
			setHistory(update)
			setPageTitle(payload.pageTitle ?? '')
			window.scrollTo(0, 0)
		})

		return () => subscription.unsubscribe()
	})

	return (
		<Router location={location} navigator={history}>
			{children}
		</Router>
	)
}

export default BrowserRouter
