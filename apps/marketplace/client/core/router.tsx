import { useEffect } from 'react'

import { noop } from 'client/common/helpers/noop.js'
import { useStore } from 'client/common/hooks/use-store.js'
import {
	preloadRouteObs,
	preloadStore,
	type RouteState,
	routeStore,
} from './models/router-model.js'
import { getRelativeRouteURL, parsePath } from './path.js'

export interface RouterOptions {
	onChange?: (context: RouteState) => void
}

export function useRouter({ onChange = noop }: RouterOptions): void {
	const visibleRoute = useStore(routeStore)

	// Handle route change
	useEffect(() => {
		const subscription = preloadRouteObs.subscribe((route) => {
			routeStore.next(route)
			onChange(route)

			const updateArgs = [{}, '', getRelativeRouteURL(route)] as const
			if (route.type === 'push') history.pushState(...updateArgs)
			else if (route.type === 'replace') history.replaceState(...updateArgs)
		})

		return () => {
			subscription.unsubscribe()
		}
	}, [onChange])

	// Handle history change
	useEffect(() => {
		function popstate() {
			preloadStore.next({ type: 'popstate', href: getRelativeRouteURL(location) })
		}

		window.addEventListener('popstate', popstate)
		return () => {
			window.removeEventListener('popstate', popstate)
		}
	}, [])

	/**
	 * Turn all HTML <a> elements into client side router links, no special framework-specific <Link> component necessary!
	 * @link https://gist.github.com/devongovett/919dc0f06585bd88af053562fd7c41b7
	 */
	useEffect(() => {
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

				const path = parsePath(link.getAttribute('href') ?? '')
				const nextHref = getRelativeRouteURL(path)
				const prevHref = getRelativeRouteURL(visibleRoute)

				if (nextHref !== prevHref) {
					preloadStore.next({ type: 'push', href: getRelativeRouteURL(path) })
				}
			}
		}

		document.addEventListener('click', onClick)
		return () => {
			document.removeEventListener('click', onClick)
		}
	}, [visibleRoute])
}
