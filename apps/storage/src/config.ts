import { customCleanEnv, num, str } from 'envalid'

import 'shared/load-env.js'

export const cleanedEnv = customCleanEnv(
	process.env,
	{
		NODE_ENV: str({
			choices: ['development', 'test', 'production', 'staging'],
			default: 'development',
		}),
		HOST: str(),
		PORT: num(),
		DATABASE_URL: str(),
	},
	(cleaned) => cleaned,
)

export const env = {
	...cleanedEnv,
	isDev: cleanedEnv.NODE_ENV === 'development',
	isTest: cleanedEnv.NODE_ENV === 'test',
	isProd: cleanedEnv.NODE_ENV === 'production',
}
