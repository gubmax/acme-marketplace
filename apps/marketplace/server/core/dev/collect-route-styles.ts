import assert from 'node:assert'
import { resolve } from 'node:path'

import type { ModuleNode, ViteDevServer } from 'vite'

import type { RenderContext } from '../render-context.js'

export interface RenderStyles {
	styles: Array<Record<string, unknown>>
}

export async function collectRouteStyles(
	viteServer: ViteDevServer,
	renderContext: RenderContext,
	entryPath: string,
) {
	const normalizedPath = resolve(entryPath).replace(/\\/g, '/')
	let entryModule = viteServer.moduleGraph.getModuleById(normalizedPath)

	// Trying to load module on first load of vite middleware
	if (!entryModule) {
		await viteServer.ssrLoadModule(normalizedPath)
		entryModule = viteServer.moduleGraph.getModuleById(normalizedPath)
	}

	assert(entryModule)

	const acc: RenderStyles = { styles: [] }
	const importedIds = new Set<string>()

	const collect = async (module: ModuleNode) => {
		if (!module.id || importedIds.has(module.id)) return

		importedIds.add(module.id)

		if (module.file?.includes('.css')) {
			const ssrModule = module.ssrModule ?? (await viteServer.ssrLoadModule(module.url))
			const content = ssrModule.default as string | object

			const styles =
				typeof content !== 'string' // ignore JS module styles
					? null
					: { type: 'text/css', 'data-vite-dev-id': module.id, content }

			if (styles) acc.styles.push(styles)
		}

		for await (const importedModule of module.importedModules) {
			await collect(importedModule)
		}
	}

	await collect(entryModule)
	renderContext.styles.push(...acc.styles)
}
