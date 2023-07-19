import { bootstrap } from './bootstrap.js'
import { appConfig } from './config.js'

const { env } = appConfig
const { server } = await bootstrap()

await server.listen({ host: env.HOST, port: env.PORT })

if (!env.isProd) console.log(`Server listening at http://${env.HOST}:${env.PORT}`)
