import { bootstrap } from './bootstrap.js'
import { appConfig } from './config.js'

const { env } = appConfig

// Bootstrap
if (!env.isTest) {
	const { server } = await bootstrap()
	await server.listen({ host: env.HOST, port: env.PORT })
}

// For tests
export default bootstrap
