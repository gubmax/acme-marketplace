import { createReadStream } from 'node:fs'

import type { FastifyInstance } from 'fastify'

import { resolvePath } from 'server/common/helpers/paths.js'
import type { Renderer } from 'server/core/prod/renderer.js'
import type ConfigService from 'server/modules/config/config.service.js'
import type LoggerService from 'server/modules/logger/logger.service.js'

export function uncaughtErrorHandler(
	server: FastifyInstance,
	renderer: Renderer,
	configService: ConfigService,
	loggerService: LoggerService,
): void {
	const { env } = configService
	const { logger } = loggerService

	server.setErrorHandler(async (error, req, res) => {
		logger.error(error, 'Uncaught error')

		if (env.isDev) {
			res.statusCode = 500
			return renderer.render(req, res)
		}

		const stream = createReadStream(resolvePath('client/pages/error.html'), 'utf-8')
		return res.status(500).type('text/html').send(stream)
	})
}
