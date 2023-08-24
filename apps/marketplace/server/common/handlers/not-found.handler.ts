import { createReadStream } from 'node:fs'

import type { FastifyInstance } from 'fastify'

import { resolvePath } from 'server/common/helpers/paths.js'
import type { Renderer } from 'server/core/prod/renderer.js'
import type ConfigService from 'server/modules/config/config.service.js'

export default function notFoundHandler(
	server: FastifyInstance,
	renderer: Renderer,
	configService: ConfigService,
) {
	const { env } = configService

	server.setNotFoundHandler(async (req, res) => {
		if (env.isDev) {
			res.statusCode = 404
			return renderer.render(req, res, 'client/404.tsx')
		}

		const stream = createReadStream(resolvePath('client/404.html'), 'utf-8')
		return res.status(404).type('text/html').send(stream)
	})
}
