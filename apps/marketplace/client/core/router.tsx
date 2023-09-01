import { isBrowser } from 'client/common/helpers/environment.js'
import { noop } from 'client/common/helpers/noop.js'
import {
	type InitialRouteOptions,
	preloadRouteObs,
	preloadStore,
	type RouteState,
	routeStore,
	setInitialPage,
} from './models/router-model.js'
import { getRelativeRouteURL, parsePath } from './path.js'

function isRouterClick(event: MouseEvent, link: HTMLAnchorElement | null): boolean {
	return (
		!!link &&
		link instanceof HTMLAnchorElement &&
		!!link.href &&
		(!link.target || link.target === '_self') &&
		link.origin === location.origin &&
		!link.hasAttribute('download') &&
		event.button === 0 && // left clicks only
		!event.metaKey && // open in new tab (mac)
		!event.ctrlKey && // open in new tab (windows)
		!event.altKey && // download
		!event.shiftKey &&
		!event.defaultPrevented
	)
}

export interface RouterOptions extends InitialRouteOptions {
	onChange?: (context: RouteState) => void
}

export function initRouter({ meta, payload, href, onChange = noop }: RouterOptions): void {
	if (isBrowser) {
		// Handle route change
		preloadRouteObs.subscribe((route) => {
			routeStore.next(route)
			onChange(route)

			const updateArgs = [{}, '', getRelativeRouteURL(route)] as const
			if (route.type === 'push') history.pushState(...updateArgs)
			else if (route.type === 'replace') history.replaceState(...updateArgs)
		})

		// Cache initial page
		preloadStore.next({ type: 'popstate', href })

		// Handle history change
		window.addEventListener('popstate', () => {
			preloadStore.next({ type: 'popstate', href: getRelativeRouteURL(location) })
		})

		/**
		 * Turn all HTML <a> elements into client side router links, no special framework-specific <Link> component necessary!
		 * @link https://gist.github.com/devongovett/919dc0f06585bd88af053562fd7c41b7
		 */
		document.addEventListener('click', (event) => {
			const link = event.target instanceof Element ? event.target.closest('a') : null
			if (!link || !isRouterClick(event, link)) return

			event.preventDefault()

			const path = parsePath(link.getAttribute('href') ?? '')
			const nextHref = getRelativeRouteURL(path)
			const prevHref = getRelativeRouteURL(routeStore.value)

			if (nextHref !== prevHref) {
				preloadStore.next({ type: 'push', href: getRelativeRouteURL(path) })
			}
		})
	}

	setInitialPage({ meta, payload, href })
}
