import { createReadStream } from 'node:fs'

import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import type { ManifestRoute } from 'virtual:routes-manifest'

import { resolvePath } from 'server/common/helpers/paths.js'
import type { Renderer } from 'server/core/prod/renderer.js'
import type ConfigService from '../config/config.service.js'

export default (
	server: FastifyInstance,
	renderer: Renderer,
	configService: ConfigService,
): void => {
	const { env } = configService

	async function sendHtml(req: FastifyRequest, res: FastifyReply, route: ManifestRoute) {
		if (route.static && env.isProd) {
			const path = route.path.endsWith('/') ? route.path + 'index' : route.path
			const stream = createReadStream(resolvePath(`client/pages${path}.html`), 'utf-8')
			return res.status(200).type('text/html').send(stream)
		}

		return renderer.render(req, res, route.id)
	}

	for (const route of renderer.routesManifest) {
		server.get(route.path, async (req, res) => sendHtml(req, res, route))
	}
}
