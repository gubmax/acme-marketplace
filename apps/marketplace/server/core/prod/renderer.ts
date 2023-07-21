import { readFile } from 'fs/promises'

import { matchRoutes } from 'react-router-dom'
import type { FastifyReply, FastifyRequest } from 'fastify'
import type { PassThrough } from 'stream'
import type { Manifest } from 'vite'

import type { Route } from 'plugins/vite-plugin-routes-manifest.js'
import { resolvePath } from 'server/common/helpers/paths.js'
import { type EntryModule, type RenderContext, renderPage } from '../render-page.js'
import { collectRouteAssets } from './collect-route-assets.js'
import { collectRouteMeta } from './collect-route-meta.js'

export interface Renderer {
	routesManifest: Route[]
	render: (req: FastifyRequest, res: FastifyReply, entry: string) => Promise<PassThrough>
}

// Init

const distPath = process.env.BUILD_ENV === 'prerendering' ? 'dist/' : ''

const assetsManifest = JSON.parse(
	await readFile(resolvePath(`${distPath}client/assets.manifest.json`), 'utf-8'),
) as Manifest

const routesManifest = JSON.parse(
	await readFile(resolvePath(`${distPath}server/routes.manifest.json`), 'utf-8'),
) as Route[]

// Render

function loadModule<T>(path: string): Promise<T> {
	return import(resolvePath(distPath + path)) as Promise<T>
}

function createRenderContext(clientEntry: string, url: string): RenderContext {
	const entryContext: RenderContext = { links: [], styles: [], scripts: [], meta: {} }
	const matches = matchRoutes<Route>(routesManifest, url) ?? []

	// Assets
	collectRouteAssets(entryContext, assetsManifest, matches, clientEntry)

	// Meta
	collectRouteMeta(entryContext, matches)

	return entryContext
}

const render: Renderer['render'] = async (req, res, entry) => {
	const clientEntry = `client/entries/${entry}.client.tsx`
	const serverEntry = `server/${entry}.server.js`

	const entryModule = await loadModule<EntryModule>(serverEntry)
	const renderContext = createRenderContext(clientEntry, req.url)
	return renderPage(req, res, { entryModule, renderContext })
}

export const renderer: Renderer = { routesManifest, render }
