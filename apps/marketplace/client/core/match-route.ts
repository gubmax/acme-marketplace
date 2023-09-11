import { type ClientRoute, type RouteDescriptor, routes } from './routes.js'

export function matchRoute(href: string): ClientRoute<unknown, RouteDescriptor> | undefined {
	for (const route of routes) {
		const match = href.match(route.pattern)
		if (match) return route
	}
}
