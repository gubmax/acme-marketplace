import { createReadStream } from 'node:fs'

import type { FastifyInstance } from 'fastify'

import { resolvePath } from 'server/common/helpers/paths.js'
import type ConfigService from 'server/modules/config/config.service.js'
import type LoggerService from 'server/modules/logger/logger.service.js'
import { RenderService } from 'server/modules/render/render.service.production.js'

export function uncaughtErrorHandler(
	server: FastifyInstance,
	configService: ConfigService,
	loggerService: LoggerService,
	renderService: RenderService,
): void {
	const { env } = configService
	const { logger } = loggerService

	server.setErrorHandler(async (error, req, res) => {
		logger.error(error, 'Uncaught error')

		if (env.isProd && !env.isPrerendering) {
			const stream = createReadStream(resolvePath('client/pages/error.html'), 'utf-8')
			return res.status(500).type('text/html').send(stream)
		}

		res.statusCode = 500
		return renderService.renderError(req, res)
	})
}
