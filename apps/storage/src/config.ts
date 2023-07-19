import * as dotenv from 'dotenv'
import { cleanEnv, num, str } from 'envalid'

const scope = process.env.NODE_ENV ?? 'development'
dotenv.config({ path: `.env.${scope}`, override: true })
dotenv.config({ path: `.env.${scope}.local`, override: true })

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
