import { bootstrap } from './bootstrap.js'
import { env } from './config.js'

const { server } = await bootstrap()

await server.listen({ host: env.HOST, port: env.PORT })
