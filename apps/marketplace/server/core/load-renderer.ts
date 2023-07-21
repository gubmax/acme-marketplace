import type { FastifyInstance } from 'fastify'

import { resolvePath } from 'server/common/helpers/paths.js'
import type ConfigService from 'server/modules/config/config.service.js'
import type { Renderer } from './prod/renderer.js'

export async function loadRenderer(
	server: FastifyInstance,
	configService: ConfigService,
): Promise<Renderer> {
	const { env } = configService

	if (env.isDev) {
		await server.register(import('@fastify/middie'))
		const rendererModule = await import('./dev/renderer.js')
		server.use(rendererModule.viteServer.middlewares)

		return rendererModule.renderer
	}

	await server.register(import('@fastify/static'), { root: resolvePath('client') })
	const rendererModule = await import('./prod/renderer.js')

	return rendererModule.renderer
}
