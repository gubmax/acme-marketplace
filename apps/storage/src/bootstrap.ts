import { IncomingMessage, Server, ServerResponse } from 'node:http'

import { PrismaClient } from '@prisma/client'
import { asValue } from 'awilix'
import { fastify, type FastifyInstance } from 'fastify'
import hyperid from 'hyperid'

import { container, DEFAULT_LOAD_MODULES_OPTS } from './container.js'

export interface BootstrapResult {
	server: FastifyInstance
}

export async function bootstrap(): Promise<BootstrapResult> {
	const uuid = hyperid()

	const server = fastify<Server, IncomingMessage, ServerResponse>({
		bodyLimit: 1048576, // 1MiB
		connectionTimeout: 60 * 1000, // 60s
		genReqId: () => uuid(),
	})

	const prisma = new PrismaClient()

	container.register({
		server: asValue(server),
		prisma: asValue(prisma),
	})

	await container.loadModules(
		['modules/**/*.(controller|repository|service).(ts|js)'],
		DEFAULT_LOAD_MODULES_OPTS,
	)

	for (const name in container.registrations) {
		if (name.endsWith('Controller')) container.resolve(name)
	}

	return { server }
}
