import { customCleanEnv, num, str } from 'envalid'

import 'shared/load-env.js'

const cleanedEnv = customCleanEnv(
	process.env,
	{
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
	},
	(cleaned) => cleaned,
)

export const env = {
	...cleanedEnv,
	isDev: cleanedEnv.NODE_ENV === 'development',
	isTest: cleanedEnv.NODE_ENV === 'test',
	isProd: cleanedEnv.NODE_ENV === 'production',
	isPrerendering: cleanedEnv.BUILD_ENV === 'prerendering',
}
