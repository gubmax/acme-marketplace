import { createReadStream } from 'node:fs'

import type { FastifyInstance } from 'fastify'

import { resolvePath } from 'server/common/helpers/paths.js'
import type ConfigService from 'server/modules/config/config.service.js'
import type { RenderService } from 'server/modules/render/render.service.production.js'

export default function notFoundHandler(
	server: FastifyInstance,
	configService: ConfigService,
	renderService: RenderService,
) {
	const { env } = configService.app

	server.setNotFoundHandler(async (req, res) => {
		if (env.isProd && !env.isPrerendering) {
			const stream = createReadStream(resolvePath('dist/client/not-found.html'), 'utf-8')
			return res.status(404).type('text/html').send(stream)
		}

		res.statusCode = 404
		return renderService.renderApp(req, res)
	})
}
