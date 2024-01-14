import { UAParser } from 'ua-parser-js'
import type { ManifestRoute } from 'virtual:routes-manifest'
import { createServer } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

import type { EntryModule, Renderer } from '../prod/renderer.js'
import { getClientRenderContext, type RenderContext } from '../render-context.js'
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
	uaString?: string,
): Promise<RenderContext> {
	const renderContext: RenderContext = {
		deviceType: 'desktop',
		links: [],
		loader: {},
		meta: {},
		scripts: [],
		styles: [],
	}

	// Context
	if (moduleId) await collectRouteContext(viteServer, renderContext, moduleId)

	// Scripts
	const clientRenderContext = getClientRenderContext(renderContext)
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
		{ content: clientRenderContext },
	)

	//Links
	renderContext.links.push({ rel: 'manifest', href: '/manifest.webmanifest' })

	// Styles
	await collectRouteStyles(viteServer, renderContext, serverEntry)

	// Device Type
	const ua = UAParser(uaString)
	if (ua.device.type) renderContext.deviceType = ua.device.type

	return renderContext
}

const render: Renderer['render'] = async (req, res, moduleId) => {
	const clientEntry = 'client/entry.client.tsx'
	const serverEntry = 'client/entry.server.tsx'

	const renderContext = await createRenderContext(
		clientEntry,
		serverEntry,
		moduleId,
		req.headers['user-agent'],
	)

	const entryModule = await loadModule<EntryModule>(serverEntry)
	const node = entryModule.handleRequest({ url: req.url, renderContext })

	return renderPage(req, res, node)
}

export const renderer: Renderer = { routesManifest, render }
