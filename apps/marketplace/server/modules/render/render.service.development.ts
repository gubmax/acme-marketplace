import assert from 'node:assert'
import { PassThrough } from 'node:stream'

import { matchRoutes, type RouteMatch } from 'react-router-dom'
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import type { InlineConfig, ViteDevServer } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

import type { Route } from 'plugins/vite-plugin-routes-manifest.js'
import { resolvePath } from 'server/common/helpers/paths.js'
import type AssetCollectorService from 'server/modules/asset-collector/asset-collector.service.js'
import type ConfigService from '../config/config.service.js'
import {
	type EntryModule,
	type RenderContextType,
	RenderService,
} from './render.service.production.js'

const INIT_ERROR_MSG = 'Vite dev server has not been initialized'

export const VITE_DEV_SERVER_CONFIG: InlineConfig = {
	plugins: [tsconfigPaths()],
	appType: 'custom',
	server: { middlewareMode: true },
	build: { minify: false },
}

export class DevelopmentRenderService extends RenderService {
	viteDevServer?: ViteDevServer

	constructor(
		protected readonly configService: ConfigService,
		protected readonly assetCollectorService: AssetCollectorService,
	) {
		super(configService, assetCollectorService)
	}

	protected loadModule<T>(path: string): Promise<T> {
		assert(this.viteDevServer, INIT_ERROR_MSG)
		return this.viteDevServer.ssrLoadModule(path) as Promise<T>
	}

	private getMetaByModuleId(id: string): (() => unknown) | undefined {
		assert(this.viteDevServer, INIT_ERROR_MSG)

		const mod = this.viteDevServer.moduleGraph.getModuleById(resolvePath(id))
		const meta = mod?.ssrModule?.meta as (() => unknown) | undefined
		return meta
	}

	protected collectRouteAssets(
		renderContext: RenderContextType,
		matches: Array<RouteMatch<string, Route>>,
		entryPath: string,
	) {
		assert(this.viteDevServer, INIT_ERROR_MSG)

		const mod = this.viteDevServer.moduleGraph.getModuleById(resolvePath(entryPath))
		const commonAssets = this.assetCollectorService.collectByModule(mod)

		renderContext.links.push(...commonAssets.links)
		renderContext.styles.push(...commonAssets.styles)
	}

	protected collectRouteMeta(
		entryContext: RenderContextType,
		matches: Array<RouteMatch<string, Route>>,
	) {
		assert(this.viteDevServer, INIT_ERROR_MSG)

		if (matches.length) {
			for (const match of matches) {
				const meta = this.getMetaByModuleId(match.route.id)
				if (meta) Object.assign(entryContext.meta, meta())
			}
		} else {
			const meta = this.getMetaByModuleId('client/not-found.tsx')
			if (meta) Object.assign(entryContext.meta, meta())
		}
	}

	protected createRenderContext(entryPath: string, url: string): RenderContextType {
		const entryContext: RenderContextType = { links: [], styles: [], scripts: [], meta: {} }
		const matches = matchRoutes<Route>(this.routesManifest, url) ?? []

		this.collectRouteAssets(entryContext, matches, entryPath)
		this.collectRouteMeta(entryContext, matches)

		return entryContext
	}

	// Public

	async init(server: FastifyInstance): Promise<void> {
		const vite = await import('vite')
		this.viteDevServer = await vite.createServer(VITE_DEV_SERVER_CONFIG)
		server.use(this.viteDevServer.middlewares)

		const { routes = [] } = await this.loadModule<{ routes: Route[] }>('virtual:routes-manifest')
		this.routesManifest = routes
	}

	async renderApp(req: FastifyRequest, res: FastifyReply): Promise<PassThrough> {
		const entryMod = await this.loadModule<EntryModule>('/client/entries/app.server.tsx')
		const renderContext = this.createRenderContext('client/entries/app.client.tsx', req.url)
		const bootstrapModules = ['/@vite/client', '/client/entries/app.client.tsx']
		return this.renderBase(req, res, { entryMod, renderContext, bootstrapModules })
	}

	async renderError(req: FastifyRequest, res: FastifyReply): Promise<PassThrough> {
		const entryMod = await this.loadModule<EntryModule>('/client/entries/error.server.tsx')
		const renderContext = this.createRenderContext('client/entries/error.client.tsx', req.url)
		const bootstrapModules = ['/@vite/client', '/client/entries/error.client.tsx']
		return this.renderBase(req, res, { entryMod, renderContext, bootstrapModules })
	}
}
