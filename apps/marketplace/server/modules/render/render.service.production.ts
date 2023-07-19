import assert from 'node:assert'
import { readFile } from 'node:fs/promises'
import { PassThrough } from 'node:stream'

import type { ReactNode } from 'react'
import { renderToPipeableStream } from 'react-dom/server'
import { matchRoutes, type RouteMatch } from 'react-router-dom'
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import isbot from 'isbot'
import type { Manifest } from 'vite'

import type { Route } from 'plugins/vite-plugin-routes-manifest.js'
import { resolvePath } from 'server/common/helpers/paths.js'
import type AssetCollectorService from 'server/modules/asset-collector/asset-collector.service.js'

const ABORT_RENDER_DELAY = 5000

export interface RenderContextType {
	links: Array<Record<string, unknown>>
	styles: Array<Record<string, unknown>>
	meta: Record<string, string>
	scripts: Array<Record<string, unknown>>
}

export interface RenderOptions {
	url: string
	renderContext: RenderContextType
}

export type RenderFn = (options: RenderOptions) => ReactNode

export interface EntryModule {
	render: RenderFn
}

export interface BaseRenderOpts {
	entryMod: EntryModule
	renderContext: RenderContextType
	bootstrapModules?: string[]
}

export class RenderService {
	#manifest?: Manifest
	routesManifest: Route[] = []

	constructor(protected readonly assetCollectorService: AssetCollectorService) {}

	protected loadModule<T>(path: string): Promise<T> {
		return import(resolvePath(path)) as Promise<T>
	}

	protected collectRouteAssets(
		renderContext: RenderContextType,
		matches: Array<RouteMatch<string, Route>>,
		entryPath: string,
	) {
		assert(this.#manifest, 'Manifest not found')
		assert(this.routesManifest, 'Pages Manifest not found')

		// Common

		const commonAssets = this.assetCollectorService.collectByManifest(this.#manifest, entryPath)
		renderContext.links.push(...commonAssets.links)
		renderContext.scripts.push(...commonAssets.scripts)

		// Routes

		for (const match of matches) {
			const routeAssets = this.assetCollectorService.collectByManifest(
				this.#manifest,
				match.route.id,
			)
			renderContext.links.push(...routeAssets.links)
			renderContext.scripts.push(...routeAssets.scripts)
		}
	}

	protected collectRouteMeta(
		renderContext: RenderContextType,
		matches: Array<RouteMatch<string, Route>>,
	) {
		// TODO: Add meta collecting via manifest
		return
	}

	protected createRenderContext(entryPath: string, url: string): RenderContextType {
		const entryContext: RenderContextType = { links: [], styles: [], scripts: [], meta: {} }
		const matches = matchRoutes<Route>(this.routesManifest, url) ?? []

		this.collectRouteAssets(entryContext, matches, entryPath)
		this.collectRouteMeta(entryContext, matches)

		return entryContext
	}

	// Public

	async init(server?: FastifyInstance): Promise<void>
	async init(): Promise<void> {
		this.#manifest = JSON.parse(
			await readFile(resolvePath('dist/client/manifest.json'), 'utf-8'),
		) as Manifest

		this.routesManifest = JSON.parse(
			await readFile(resolvePath('dist/server/routes.manifest.json'), 'utf-8'),
		) as Route[]
	}

	protected renderBase(
		req: FastifyRequest,
		res: FastifyReply,
		opts: BaseRenderOpts,
	): Promise<PassThrough> {
		const { entryMod, renderContext, bootstrapModules } = opts

		// Inject entry context like script for client side
		renderContext.scripts.push({
			id: '__RENDER_CONTEXT__',
			type: 'application/json',
			content: JSON.stringify({ links: [], meta: renderContext.meta, scripts: [], styles: [] }),
		})

		const node = entryMod.render({ url: req.url, renderContext })

		const ua = typeof req.headers === 'object' ? req.headers['user-agent'] : null
		const callbackName = !ua || isbot(ua) ? 'onAllReady' : 'onShellReady'

		let didError = false
		return new Promise((resolve, reject) => {
			const stream = renderToPipeableStream(node, {
				bootstrapModules,
				[callbackName]() {
					const body = new PassThrough()
					if (didError) res.statusCode = 500
					void res.type('text/html')
					resolve(body)
					stream.pipe(body)
				},
				onShellError(err) {
					reject(err)
				},
				onError(err) {
					didError = true
					console.error(err)
				},
			})

			setTimeout(() => stream.abort(), ABORT_RENDER_DELAY)
		})
	}

	async renderApp(req: FastifyRequest, res: FastifyReply): Promise<PassThrough> {
		const entryMod = await this.loadModule<EntryModule>('dist/server/app.server.js')
		const renderContext = this.createRenderContext('client/entries/app.client.tsx', req.url)
		return this.renderBase(req, res, { entryMod, renderContext })
	}

	async renderError(req: FastifyRequest, res: FastifyReply): Promise<PassThrough> {
		const entryMod = await this.loadModule<EntryModule>('dist/server/error.server.js')
		const renderContext = this.createRenderContext('client/entries/error.client.tsx', req.url)
		return this.renderBase(req, res, { entryMod, renderContext })
	}
}
