import { noop } from '@acme/ui/helpers/noop.js'

import { RouterModel, type RouteState } from './models/router-model.js'
import { getRelativeRouteURL, parsePath } from './path.js'

export const routerModel = new RouterModel()

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

export interface RouterOptions {
	onChange?: (context: RouteState) => void
}

export function initBrowserRouter({ onChange = noop }: RouterOptions): void {
	// Handle route change
	routerModel.preloadObs.subscribe((route) => {
		if (route.loading) return

		routerModel.routeStore.next(route.state)
		onChange(route.state)

		const updateArgs = [{}, '', getRelativeRouteURL(route.state)] as const
		if (route.state.type === 'push') history.pushState(...updateArgs)
		else if (route.state.type === 'replace') history.replaceState(...updateArgs)
	})

	// Handle history change
	window.addEventListener('popstate', () => {
		routerModel.preloadStore.next({ type: 'popstate', href: getRelativeRouteURL(location) })
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
		const prevHref = getRelativeRouteURL(routerModel.routeStore.value)

		if (nextHref !== prevHref) {
			routerModel.preloadStore.next({ type: 'push', href: nextHref })
		}
	})
}
