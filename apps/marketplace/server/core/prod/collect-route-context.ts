import type { RouteMatch } from 'react-router-dom'

import type { Route } from 'plugins/vite-plugin-routes-manifest.js'
import type { RenderContext } from '../render-page.js'

/**
 * TODO: Add meta and payload collecting
 */
export function collectRouteContext(
	entryContext: RenderContext,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	matches: Array<RouteMatch<string, Route>>,
): void {
	Object.assign(entryContext.meta, {})
}
