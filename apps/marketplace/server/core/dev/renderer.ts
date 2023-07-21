import { matchRoutes } from 'react-router-dom'
import { createServer } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

import type { Route } from 'plugins/vite-plugin-routes-manifest.js'
import type { Renderer } from '../prod/renderer.js'
import { type EntryModule, type RenderContext, renderPage } from '../render-page.js'
import { collectRouteMeta } from './collect-route-meta.js'
import { collectRouteStyles } from './collect-route-styles.js'

// Init

export const viteServer = await createServer({
	plugins: [tsconfigPaths()],
	appType: 'custom',
	server: { middlewareMode: true },
	build: { minify: false },
})

const { routes } = await loadModule<{ routes: Route[] }>('virtual:routes-manifest')
const routesManifest = routes ?? []

// Render

function loadModule<T>(path: string): Promise<T> {
	return viteServer.ssrLoadModule(path) as Promise<T>
}

async function createRenderContext(
	clientEntry: string,
	serverEntry: string,
	url: string,
): Promise<RenderContext> {
	const renderContext: RenderContext = { links: [], styles: [], scripts: [], meta: {} }

	// Scripts
	renderContext.scripts.push(
		{ type: 'module', src: '/@vite/client' },
		{ type: 'module', src: clientEntry },
	)

	// Styles
	await collectRouteStyles(viteServer, renderContext, serverEntry)

	// Meta
	const matches = matchRoutes<Route>(routesManifest, url) ?? []
	await collectRouteMeta(viteServer, renderContext, matches)

	return renderContext
}

const render: Renderer['render'] = async (req, res, entry) => {
	const clientEntry = `client/entries/${entry}.client.tsx`
	const serverEntry = `client/entries/${entry}.server.tsx`

	const entryModule = await loadModule<EntryModule>(serverEntry)
	const renderContext = await createRenderContext(clientEntry, serverEntry, req.url)
	return renderPage(req, res, { entryModule, renderContext })
}

export const renderer: Renderer = { routesManifest, render }
