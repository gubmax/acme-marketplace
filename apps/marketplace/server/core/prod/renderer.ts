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

interface RouteModule {
	meta?: RenderContext['meta']
	payload?: { pageTitle?: string }
}

export interface EntryModule {
	handleRequest: (options: { url: string; renderContext: RenderContext }) => ReactNode
	modules: Record<string, (() => Promise<RouteModule>) | undefined>
	notFoundModule: () => Promise<RouteModule>
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

async function createRenderContext(
	clientEntry: string,
	entryModule: EntryModule,
	moduleId?: string,
): Promise<RenderContext> {
	const entryContext: RenderContext = { payload: {}, links: [], styles: [], scripts: [], meta: {} }

	if (moduleId) {
		// Assets
		collectRouteAssets(entryContext, assetsManifest, clientEntry, moduleId)

		// Context
		await collectRouteContext(entryContext, entryModule, moduleId)
	}

	return entryContext
}

const render: Renderer['render'] = async (req, res, moduleId) => {
	const clientEntry = 'client/entry.client.tsx'
	const serverEntry = 'server/entry.server.js'

	const entryModule = await loadModule<EntryModule>(serverEntry)
	const renderContext = await createRenderContext(clientEntry, entryModule, moduleId)
	const node = entryModule.handleRequest({ url: req.url, renderContext })

	const renderContextJSON = getRenderContextJSON(renderContext)
	renderContext.scripts.push(renderContextJSON)

	return renderPage(req, res, node)
}

export const renderer: Renderer = { routesManifest, render }
