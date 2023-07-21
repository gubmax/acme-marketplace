import { createReadStream } from 'node:fs'

import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'

import type { Route } from 'plugins/vite-plugin-routes-manifest.js'
import { resolvePath } from 'server/common/helpers/paths.js'
import type { Renderer } from 'server/core/prod/renderer.js'
import type ConfigService from '../config/config.service.js'

export default (
	server: FastifyInstance,
	renderer: Renderer,
	configService: ConfigService,
): void => {
	const { env } = configService

	async function sendHtml(req: FastifyRequest, res: FastifyReply, route: Route) {
		if (route.static && env.isProd) {
			const path = route.path.endsWith('/') ? route.path + 'index' : route.path
			const stream = createReadStream(resolvePath(`client/pages${path}.html`), 'utf-8')
			return res.status(200).type('text/html').send(stream)
		}

		return renderer.render(req, res, 'app')
	}

	function setRouteHandlers(routes: Route[]) {
		for (const route of routes) {
			server.get(route.path, async (req, res) => sendHtml(req, res, route))
			if (route.children.length) setRouteHandlers(route.children)
		}
	}

	setRouteHandlers(renderer.routesManifest)
}
