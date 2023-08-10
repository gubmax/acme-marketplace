import type { ViteDevServer } from 'vite'

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
	moduleId: string,
): Promise<void> {
	const { meta, payload } = await getContextByModuleId(viteServer, moduleId)
	if (meta) Object.assign(entryContext.meta, meta)
	if (payload) Object.assign(entryContext.payload, payload)
}
