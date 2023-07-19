import * as dotenv from 'dotenv'

const scope = process.env.NODE_ENV ?? 'development'
dotenv.config({ path: `.env.${scope}`, override: true })
dotenv.config({ path: `.env.${scope}.local`, override: true })
