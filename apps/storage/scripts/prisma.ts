import { spawn } from 'node:child_process'

import 'src/config.js'

const args = process.argv.slice(2)
spawn('node_modules/.bin/prisma', args, { stdio: 'inherit' })
