import { readFile } from 'fs/promises'

import type { ReactNode } from 'react'
import type { FastifyReply, FastifyRequest } from 'fastify'
import type { PassThrough } from 'stream'
import type { Manifest } from 'vite'

import type { ManifestRoute } from 'plugins/vite-plugin-routes-manifest.js'
import { resolvePath } from 'server/common/helpers/paths.js'
import { getRenderContextJSON, type RenderContext } from '../render.context.js'
import { renderPage } from '../render-page.js'
import { collectRouteAssets } from './collect-route-assets.js'
import { collectRouteContext } from './collect-route-context.js'

export interface EntryModule {
	handleRequest: (options: { url: string; renderContext: RenderContext }) => ReactNode
}

export interface Renderer {
	routesManifest: ManifestRoute[]
	render: (req: FastifyRequest, res: FastifyReply, moduleId?: string) => Promise<PassThrough>
}

// Init

const distPath = process.env.BUILD_ENV === 'prerendering' ? 'dist/' : ''

const assetsManifest = JSON.parse(
	await readFile(resolvePath(`${distPath}client/assets.manifest.json`), 'utf-8'),
) as Manifest

const routesManifest = JSON.parse(
	await readFile(resolvePath(`${distPath}server/routes.manifest.json`), 'utf-8'),
) as ManifestRoute[]

// Render

function loadModule<T>(path: string): Promise<T> {
	return import(resolvePath(distPath + path)) as Promise<T>
}

function createRenderContext(clientEntry: string, moduleId?: string): RenderContext {
	const entryContext: RenderContext = { payload: {}, links: [], styles: [], scripts: [], meta: {} }

	if (moduleId) {
		// Assets
		collectRouteAssets(entryContext, assetsManifest, clientEntry, moduleId)

		// Context
		collectRouteContext(entryContext, moduleId)
	}

	return entryContext
}

const render: Renderer['render'] = async (req, res, moduleId) => {
	const clientEntry = 'client/entry.client.tsx'
	const serverEntry = 'server/entry.server.js'

	const renderContext = createRenderContext(clientEntry, moduleId)

	const entryModule = await loadModule<EntryModule>(serverEntry)
	const node = entryModule.handleRequest({ url: req.url, renderContext })

	const renderContextJSON = getRenderContextJSON(renderContext)
	renderContext.scripts.push(renderContextJSON)

	return renderPage(req, res, node)
}

export const renderer: Renderer = { routesManifest, render }
