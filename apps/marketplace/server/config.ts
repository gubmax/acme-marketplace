import { cleanEnv, num, str } from 'envalid'

import 'shared/load-env.js'

const env = cleanEnv(process.env, {
	NODE_ENV: str({
		choices: ['development', 'test', 'production', 'staging'],
		default: process.env.NODE_ENV ?? 'development',
	}),
	BUILD_ENV: str({
		choices: ['prerendering', 'production'],
		default: 'production',
	}),
	HOST: str(),
	PORT: num(),
})

export const appConfig = {
	env: {
		...env,
		isDev: env.NODE_ENV === 'development',
		isTest: env.NODE_ENV === 'test',
		isProd: env.NODE_ENV === 'production',
		isStaging: env.NODE_ENV === 'staging',
		isPrerendering: env.BUILD_ENV === 'prerendering',
	},
}
