import type { FastifyBaseLogger } from 'fastify'
import { type DestinationStream, type LoggerOptions, pino } from 'pino'
import pretty from 'pino-pretty'

import type ConfigService from '../config/config.service.js'
import { levelPrettifier, messageFormat, timePrettifier } from './prettifier.js'

export default class LoggerService {
	readonly logger: FastifyBaseLogger

	constructor(private configService: ConfigService) {
		const { env } = configService.app

		let optionsOrStream: LoggerOptions | DestinationStream

		if (env.isProd) {
			optionsOrStream = { enabled: !env.isPrerendering }
		} else {
			optionsOrStream = pretty({
				colorize: false,
				hideObject: true,
				ignore: 'hostname,pid,name,caller',
				messageFormat,
				customPrettifiers: {
					time: timePrettifier,
					level: levelPrettifier,
				},
			})
		}

		this.logger = pino(optionsOrStream)
	}
}
