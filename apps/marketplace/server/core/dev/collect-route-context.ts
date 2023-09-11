import type { ViteDevServer } from 'vite'

import { resolvePath } from 'server/common/helpers/paths.js'
import type { RenderContext } from '../render-context.js'

export async function collectRouteContext(
	viteServer: ViteDevServer,
	entryContext: RenderContext,
	moduleId: string,
): Promise<void> {
	let module = viteServer.moduleGraph.getModuleById(resolvePath(moduleId))

	// Trying to load module on first load of vite middleware
	if (!module?.ssrModule) {
		await viteServer.ssrLoadModule(resolvePath(moduleId))
		module = viteServer.moduleGraph.getModuleById(resolvePath(moduleId))
	}

	if (module?.ssrModule) {
		// TODO: Move HtmlMetaDescriptor types to shared package
		const loader = (module.ssrModule.loader as (() => RenderContext['loader']) | undefined)?.()
		if (loader) Object.assign(entryContext.loader, loader)

		const meta = (module.ssrModule.meta as (() => RenderContext['meta']) | undefined)?.()
		if (meta) Object.assign(entryContext.meta, meta)
	}
}
