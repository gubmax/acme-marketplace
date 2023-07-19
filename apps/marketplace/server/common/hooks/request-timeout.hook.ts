import type { FastifyInstance } from 'fastify'

import type LoggerService from 'server/modules/logger/logger.service.js'

export default function requestTimeoutHook(
	server: FastifyInstance,
	loggerService: LoggerService,
): void {
	const { logger } = loggerService

	server.addHook('onTimeout', (req, res, done) => {
		const payload = { url: req.url }
		logger.error(payload, 'Request timeout')

		done()
	})
}
