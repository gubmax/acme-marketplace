import { createReadStream } from 'node:fs'

import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'

import type { Route } from 'plugins/vite-plugin-routes-manifest.js'
import { resolvePath } from 'server/common/helpers/paths.js'
import type ConfigService from 'server/modules/config/config.service.js'
import type { RenderService } from './render.service.production.js'

export default (
	server: FastifyInstance,
	configService: ConfigService,
	renderService: RenderService,
): void => {
	const { env } = configService.app

	async function sendHtml(req: FastifyRequest, res: FastifyReply, route: Route) {
		if (route.static && env.isProd && !env.isPrerendering) {
			const path = route.path.endsWith('/') ? route.path + 'index' : route.path
			const stream = createReadStream(resolvePath(`client/pages${path}.html`), 'utf-8')
			return res.status(200).type('text/html').send(stream)
		}

		return renderService.renderApp(req, res)
	}

	function setRouteHandlers(routes: Route[]) {
		for (const route of routes) {
			server.get(route.path, async (req, res) => sendHtml(req, res, route))
			if (route.children.length) setRouteHandlers(route.children)
		}
	}

	setRouteHandlers(renderService.routesManifest)
}
