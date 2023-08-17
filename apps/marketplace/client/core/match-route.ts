import { type ClientRoute, routes } from './routes.js'

export function matchRoute(url: string): ClientRoute | undefined {
	for (const route of routes) {
		const match = url.match(route.pattern)
		if (match) return route
	}
}
