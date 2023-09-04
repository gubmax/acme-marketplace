import { customCleanEnv, num, str } from 'envalid'

import { LogLevel } from 'shared/logger/constants.js'

import 'shared/load-env.js'

export const cleanedEnv = customCleanEnv(
	process.env,
	{
		NODE_ENV: str({
			choices: ['development', 'test', 'production', 'staging'],
			default: 'development',
		}),
		HOST: str({ default: '0.0.0.0' }),
		PORT: num({ default: 8080 }),
		DATABASE_URL: str(),
		LOG_LEVEL: str({
			choices: [
				LogLevel.Fatal, // 60
				LogLevel.Error, // 50
				LogLevel.Warn, // 40
				LogLevel.Info, // 30
				LogLevel.Debug, // 20
				LogLevel.Trace, // 10
			],
			default: LogLevel.Info,
		}),
	},
	(cleaned) => cleaned,
)

export const env = {
	...cleanedEnv,
	isDev: cleanedEnv.NODE_ENV === 'development',
	isTest: cleanedEnv.NODE_ENV === 'test',
	isProd: cleanedEnv.NODE_ENV === 'production',
}
