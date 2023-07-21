import type { RouteMatch } from 'react-router-dom'
import type { ViteDevServer } from 'vite'

import type { Route } from 'plugins/vite-plugin-routes-manifest.js'
import { resolvePath } from 'server/common/helpers/paths.js'
import type { RenderContext } from '../render-page.js'

async function getMetaByModuleId(
	viteServer: ViteDevServer,
	id: string,
): Promise<RenderContext['meta'] | undefined> {
	let module = viteServer.moduleGraph.getModuleById(resolvePath(id))

	if (!module?.ssrModule) {
		await viteServer.ssrLoadModule(resolvePath(id))
		module = viteServer.moduleGraph.getModuleById(resolvePath(id))
	}

	const meta = module?.ssrModule?.meta as () => RenderContext['meta'] | undefined
	return meta?.()
}

export async function collectRouteMeta(
	viteServer: ViteDevServer,
	entryContext: RenderContext,
	matches: Array<RouteMatch<string, Route>>,
): Promise<void> {
	if (matches.length) {
		for (const match of matches) {
			const meta = await getMetaByModuleId(viteServer, match.route.id)
			if (meta) Object.assign(entryContext.meta, meta)
		}
	} else {
		const meta = await getMetaByModuleId(viteServer, 'client/404.tsx')
		if (meta) Object.assign(entryContext.meta, meta)
	}
}
