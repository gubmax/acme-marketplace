import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

import type { PrismaClient } from '@prisma/client'
import { createContainer, Lifetime } from 'awilix'
import type { LoadModulesOptions } from 'awilix/lib/load-modules.js'
import type { FastifyInstance } from 'fastify'

export interface Container {
	server: FastifyInstance
	prisma: PrismaClient
}

/**
 * ## Dependency Injection Container
 * @docs https://github.com/jeffijoe/awilix
 */
export const container = createContainer({ injectionMode: 'CLASSIC' })

export const DEFAULT_LOAD_MODULES_OPTS: LoadModulesOptions<true> = {
	cwd: dirname(fileURLToPath(import.meta.url)),
	formatName: 'camelCase',
	resolverOptions: { lifetime: Lifetime.SINGLETON },
	esModules: true,
}
