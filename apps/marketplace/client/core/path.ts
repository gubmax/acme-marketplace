export interface Path {
	hash?: string
	href: string
	pathname: string
	search?: string
}

export function parsePath(href: string): Path {
	const path: Path = { href, pathname: '/' }

	if (href) {
		const hashIndex = href.indexOf('#')
		if (hashIndex >= 0) {
			path.hash = href.substring(hashIndex)
			href = href.substring(0, hashIndex)
		}

		const searchIndex = href.indexOf('?')
		if (searchIndex >= 0) {
			path.search = href.substring(searchIndex)
			href = href.substring(0, searchIndex)
		}

		if (href) path.pathname = href
	}

	return path
}

export function parseParams(search?: string): Record<string, string> {
	const searchParams = new URLSearchParams(search)
	const entries = searchParams.entries()

	const result: Record<string, string> = {}
	for (const [key, value] of entries) result[key] = value

	return result
}

export function getRelativeRouteURL(route: { pathname: string; search?: string }): string {
	return route.pathname + (route.search ?? '')
}
