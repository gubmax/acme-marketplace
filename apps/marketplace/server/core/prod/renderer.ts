import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

import type { ReactNode } from 'react'
import type { FastifyReply, FastifyRequest } from 'fastify'
import type { PassThrough } from 'stream'
import UAParser from 'ua-parser-js'
import type { ManifestRoute } from 'virtual:routes-manifest'
import type { Manifest } from 'vite'

import { getClientRenderContext, type RenderContext } from '../render-context.js'
import { renderPage } from '../render-page.js'
import { collectRouteAssets } from './collect-route-assets.js'
import { collectRouteContext } from './collect-route-context.js'

interface RouteModule {
	loader?: RenderContext['loader']
	meta?: RenderContext['meta']
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
	await readFile(resolve(distPath, 'client/assets.manifest.json'), 'utf-8'),
) as Manifest

const routesManifest = JSON.parse(
	await readFile(resolve(distPath, 'server/routes.manifest.json'), 'utf-8'),
) as ManifestRoute[]

// Render

function loadModule<T>(path: string): Promise<T> {
	return import(resolve(distPath, path)) as Promise<T>
}

async function createRenderContext(
	clientEntry: string,
	entryModule: EntryModule,
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

	if (moduleId) {
		// Assets
		collectRouteAssets(renderContext, assetsManifest, clientEntry, moduleId)

		// Context
		await collectRouteContext(renderContext, entryModule, moduleId)
	}

	// Device Type
	const ua = UAParser(uaString)
	if (ua.device.type) renderContext.deviceType = ua.device.type

	// Scripts
	const clientRenderContext = getClientRenderContext(renderContext)
	renderContext.scripts.push({ content: clientRenderContext })

	// Links
	renderContext.links.push({ rel: 'manifest', href: '/manifest.webmanifest' })

	return renderContext
}

const render: Renderer['render'] = async (req, res, moduleId) => {
	const clientEntry = 'client/entry.client.tsx'
	const serverEntry = 'server/entry.server.js'

	const entryModule = await loadModule<EntryModule>(serverEntry)

	const renderContext = await createRenderContext(
		clientEntry,
		entryModule,
		moduleId,
		req.headers['user-agent'],
	)

	const node = entryModule.handleRequest({ url: req.url, renderContext })

	return renderPage(req, res, node)
}

export const renderer: Renderer = { routesManifest, render }
