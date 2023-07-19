import { cleanEnv, num, str } from 'envalid'

import 'shared/load-env.js'

const env = cleanEnv(process.env, {
	NODE_ENV: str({
		choices: ['development', 'test', 'production', 'staging'],
		default: 'development',
	}),
	HOST: str(),
	PORT: num(),
	DATABASE_URL: str(),
})

export const appConfig = { env }
