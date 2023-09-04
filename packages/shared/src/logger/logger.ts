import { pino } from 'pino'
import pinoPretty from 'pino-pretty'

import { LogLevel } from './constants.js'
import { levelPrettifier, messageFormat, timePrettifier } from './prettifier.js'

interface CustomLoggerOptions {
	enabled?: boolean
	level?: string
	pretty?: boolean
}

export function customLogger({
	enabled = true,
	level = LogLevel.Info,
	pretty = false,
}: CustomLoggerOptions) {
	if (enabled && pretty) {
		return pino(
			{ enabled, level },
			// @ts-expect-error Wrong export for NodeNext modules
			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
			pinoPretty({
				colorize: false,
				hideObject: true,
				ignore: 'hostname,pid,name,caller',
				messageFormat,
				customPrettifiers: { time: timePrettifier, level: levelPrettifier },
			}),
		)
	}

	return pino({ enabled, level })
}
