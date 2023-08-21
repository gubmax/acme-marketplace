import { createServer } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

import type { ManifestRoute } from 'plugins/vite-plugin-routes-manifest.js'
import type { Renderer } from '../prod/renderer.js'
import { type EntryModule, type RenderContext, renderPage } from '../render-page.js'
import { collectRouteContext } from './collect-route-context.js'
import { collectRouteStyles } from './collect-route-styles.js'

// Init

export const viteServer = await createServer({
	plugins: [tsconfigPaths()],
	appType: 'custom',
	server: { middlewareMode: true },
	build: { minify: false },
})

const { routes } = await loadModule<{ routes: ManifestRoute[] }>('virtual:routes-manifest')
const routesManifest = routes

// Render

function loadModule<T>(path: string): Promise<T> {
	return viteServer.ssrLoadModule(path) as Promise<T>
}

async function createRenderContext(
	clientEntry: string,
	serverEntry: string,
	moduleId?: string,
): Promise<RenderContext> {
	const renderContext: RenderContext = { links: [], meta: {}, payload: {}, scripts: [], styles: [] }

	// Scripts
	renderContext.scripts.push(
		{ type: 'module', src: '/@vite/client' },
		{ type: 'module', src: clientEntry },
	)

	// Styles
	await collectRouteStyles(viteServer, renderContext, serverEntry)

	// Context
	if (moduleId) await collectRouteContext(viteServer, renderContext, moduleId)

	return renderContext
}

const render: Renderer['render'] = async (req, res, entry, moduleId) => {
	const clientEntry = `client/entries/${entry}.client.tsx`
	const serverEntry = `client/entries/${entry}.server.tsx`

	const entryModule = await loadModule<EntryModule>(serverEntry)
	const renderContext = await createRenderContext(clientEntry, serverEntry, moduleId)
	return renderPage(req, res, { entryModule, renderContext })
}

export const renderer: Renderer = { routesManifest, render }
