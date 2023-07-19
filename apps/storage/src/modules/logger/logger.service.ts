import type { FastifyBaseLogger } from 'fastify'

import { customLogger } from 'shared/logger/logger.js'
import type ConfigService from '../config/config.service.js'

export default class LoggerService {
	readonly logger: FastifyBaseLogger

	constructor(private configService: ConfigService) {
		const { env } = configService.app
		this.logger = customLogger({ pretty: env.isDev })
	}
}
