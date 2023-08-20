import { type ClientRoute, routes } from './routes.js'

export function matchRoute(href: string): ClientRoute | undefined {
	for (const route of routes) {
		const match = href.match(route.pattern)
		if (match) return route
	}
}
