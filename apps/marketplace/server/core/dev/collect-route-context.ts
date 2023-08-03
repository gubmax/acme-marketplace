import type { RouteMatch } from 'react-router-dom'
import type { ViteDevServer } from 'vite'

import type { Route } from 'plugins/vite-plugin-routes-manifest.js'
import { resolvePath } from 'server/common/helpers/paths.js'
import type { RenderContext } from '../render-page.js'

async function getContextByModuleId(
	viteServer: ViteDevServer,
	id: string,
): Promise<{ meta?: RenderContext['meta']; payload?: { pageTitle?: string } }> {
	let module = viteServer.moduleGraph.getModuleById(resolvePath(id))

	if (!module?.ssrModule) {
		await viteServer.ssrLoadModule(resolvePath(id))
		module = viteServer.moduleGraph.getModuleById(resolvePath(id))
	}

	let meta, payload

	if (module?.ssrModule) {
		meta = (module?.ssrModule?.meta as () => RenderContext['meta'] | undefined)?.()
		payload = (module?.ssrModule?.payload as () => { pageTitle?: string } | undefined)?.()
	}

	return { meta, payload }
}

export async function collectRouteContext(
	viteServer: ViteDevServer,
	entryContext: RenderContext,
	matches: Array<RouteMatch<string, Route>>,
): Promise<void> {
	if (!matches.length) {
		const { meta, payload } = await getContextByModuleId(viteServer, 'client/404.tsx')
		if (meta) Object.assign(entryContext.meta, meta)
		if (payload) Object.assign(entryContext.payload, payload)
		return
	}

	for (const match of matches) {
		const { meta, payload } = await getContextByModuleId(viteServer, match.route.id)
		if (meta) Object.assign(entryContext.meta, meta)
		if (payload) Object.assign(entryContext.payload, payload)
	}
}
