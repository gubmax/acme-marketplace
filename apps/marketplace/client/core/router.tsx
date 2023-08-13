import { useEffect, useState } from 'react'
import { useEffectOnce } from 'ui/hooks/use-effect-once.js'

import { noop } from 'client/common/helpers/noop.js'
import { matchRoute } from './match-route.js'
import { historyStore, preloadRouteObs, type RouteContext } from './models/router-model.js'
import { notFoundRoute } from './routes.js'

type RouteElement = Required<RouteContext>['element']

export interface RouterOptions {
	url: string
	onChange?: (context: RouteContext) => void
}

export function useRouter({ url, onChange = noop }: RouterOptions): RouteElement {
	const [visibleRoute, setVisibleRoute] = useState<RouteElement>(
		() => matchRoute(url)?.element ?? notFoundRoute.element,
	)

	// Change current page
	useEffect(() => {
		const subscription = preloadRouteObs.subscribe((route) => {
			setVisibleRoute(route.element)
			onChange(route)
			if (route.type !== 'popstate') history.pushState({}, '', route.url)
		})

		return () => subscription.unsubscribe()
	}, [onChange])

	// Set preload state on app bootstrap
	useEffectOnce(() => historyStore.next({ type: 'popstate', url }))

	/**
	 * Turn all HTML <a> elements into client side router links, no special framework-specific <Link> component necessary!
	 * @link https://gist.github.com/devongovett/919dc0f06585bd88af053562fd7c41b7
	 */
	useEffect(() => {
		let prevUrl = location.pathname + location.search

		const onClick = (e: MouseEvent) => {
			const link = e.target instanceof Element ? e.target.closest('a') : null

			if (
				link &&
				link instanceof HTMLAnchorElement &&
				link.href &&
				(!link.target || link.target === '_self') &&
				link.origin === location.origin &&
				!link.hasAttribute('download') &&
				e.button === 0 && // left clicks only
				!e.metaKey && // open in new tab (mac)
				!e.ctrlKey && // open in new tab (windows)
				!e.altKey && // download
				!e.shiftKey &&
				!e.defaultPrevented
			) {
				e.preventDefault()

				const nextUrl = link.getAttribute('href') ?? ''

				if (nextUrl !== prevUrl) {
					prevUrl = nextUrl
					historyStore.next({ type: 'push', url: nextUrl })
				}
			}
		}

		document.addEventListener('click', onClick)
		return () => document.removeEventListener('click', onClick)
	}, [])

	// Handle history change
	useEffect(() => {
		function popstate() {
			historyStore.next({ type: 'popstate', url: location.pathname })
		}

		window.addEventListener('popstate', popstate)
		return () => window.removeEventListener('popstate', popstate)
	}, [])

	return visibleRoute
}
