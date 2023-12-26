import { customLogger } from '@acme/shared/logger/logger.js'
import type { FastifyBaseLogger } from 'fastify'

import type ConfigService from '../config/config.service.js'

export default class LoggerService {
	readonly logger: FastifyBaseLogger

	constructor(private configService: ConfigService) {
		const { env } = configService
		this.logger = customLogger({ pretty: env.isDev, level: env.LOG_LEVEL })
	}
}
