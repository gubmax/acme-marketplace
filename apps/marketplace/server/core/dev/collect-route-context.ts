import assert from 'node:assert'
import { resolve } from 'node:path'

import type { ViteDevServer } from 'vite'

import type { RenderContext } from '../render-context.js'

export async function collectRouteContext(
	viteServer: ViteDevServer,
	entryContext: RenderContext,
	moduleId: string,
): Promise<void> {
	const normalizedPath = resolve(moduleId).replace(/\\/g, '/')
	let module = viteServer.moduleGraph.getModuleById(normalizedPath)

	// Trying to load module on first load of vite middleware
	if (!module?.ssrModule) {
		await viteServer.ssrLoadModule(normalizedPath)
		module = viteServer.moduleGraph.getModuleById(normalizedPath)
	}

	assert(module?.ssrModule)

	// TODO: Move HtmlMetaDescriptor types to shared package
	const loader = (module.ssrModule.loader as (() => RenderContext['loader']) | undefined)?.()
	if (loader) Object.assign(entryContext.loader, loader)

	const meta = (module.ssrModule.meta as (() => RenderContext['meta']) | undefined)?.()
	if (meta) Object.assign(entryContext.meta, meta)
}
