import { bootstrap } from './bootstrap.js'
import { env } from './config.js'

// Bootstrap
if (!env.isTest) {
	const { server } = await bootstrap()
	await server.listen({ host: env.HOST, port: env.PORT })
}

// For tests
export default bootstrap
