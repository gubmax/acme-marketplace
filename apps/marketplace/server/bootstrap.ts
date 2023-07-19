import { IncomingMessage, Server, ServerResponse } from 'node:http'

import { asValue } from 'awilix'
import { fastify, type FastifyInstance } from 'fastify'
import hyperid from 'hyperid'

import { resolvePath } from './common/helpers/paths.js'
import { container, DEFAULT_LOAD_MODULES_OPTS } from './container.js'
import type ConfigService from './modules/config/config.service.js'
import type LoggerService from './modules/logger/logger.service.js'
import type { RenderService } from './modules/render/render.service.production.js'

export interface BootstrapResult {
	server: FastifyInstance
}

export async function bootstrap(): Promise<BootstrapResult> {
	// Services

	await container.loadModules(['modules/**/*.service.(ts|js)'], DEFAULT_LOAD_MODULES_OPTS)

	const loggerService = container.resolve<LoggerService>('loggerService')
	const configService = container.resolve<ConfigService>('configService')
	const renderService = container.resolve<RenderService>('renderService')

	// Server Instance

	const uuid = hyperid()

	const server = fastify<Server, IncomingMessage, ServerResponse>({
		bodyLimit: 1048576, // 1MiB
		connectionTimeout: 60 * 1000, // 60s
		disableRequestLogging: true,
		logger: loggerService.logger,
		genReqId: () => uuid(),
	})

	const { env } = configService.app
	if (env.isProd)
		await server.register(import('@fastify/static'), { root: resolvePath('dist/client') })
	else await server.register(import('@fastify/middie'))

	container.register({ server: asValue(server) })

	// Initialization

	await renderService.init(server)

	// Routes

	await container.loadModules(
		['(modules|common)/**/*.(controller|handler|hook).(ts|js)'],
		DEFAULT_LOAD_MODULES_OPTS,
	)

	for (const name in container.registrations) {
		if (/.*(Controller|Handler|Hook)$/.test(name)) container.resolve(name)
	}

	return { server }
}
