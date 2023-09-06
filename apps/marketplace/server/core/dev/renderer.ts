import { createServer } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

import type { ManifestRoute } from 'plugins/vite-plugin-routes-manifest.js'
import type { EntryModule, Renderer } from '../prod/renderer.js'
import { getRenderContextJSON, type RenderContext } from '../render.context.js'
import { renderPage } from '../render-page.js'
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
		{
			type: 'module',
			content: String.raw`
import RefreshRuntime from "/@react-refresh"
RefreshRuntime.injectIntoGlobalHook(window)
window.$RefreshReg$ = () => {}
window.$RefreshSig$ = () => (type) => type
window.__vite_plugin_react_preamble_installed__ = true
`,
		},
		{ type: 'module', src: '/@vite/client' },
		{ type: 'module', src: clientEntry },
	)

	//Links
	renderContext.links.push({ rel: 'manifest', href: '/manifest.webmanifest' })

	// Styles
	await collectRouteStyles(viteServer, renderContext, serverEntry)

	// Context
	if (moduleId) await collectRouteContext(viteServer, renderContext, moduleId)

	return renderContext
}

const render: Renderer['render'] = async (req, res, moduleId) => {
	const clientEntry = 'client/entry.client.tsx'
	const serverEntry = 'client/entry.server.tsx'

	const renderContext = await createRenderContext(clientEntry, serverEntry, moduleId)

	const entryModule = await loadModule<EntryModule>(serverEntry)
	const node = entryModule.handleRequest({ url: req.url, renderContext })

	const renderContextJSON = getRenderContextJSON(renderContext)
	renderContext.scripts.push(renderContextJSON)

	return renderPage(req, res, node)
}

export const renderer: Renderer = { routesManifest, render }
