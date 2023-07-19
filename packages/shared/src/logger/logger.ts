import { type DestinationStream, type LoggerOptions, pino } from 'pino'
import pinoPretty from 'pino-pretty'

import { levelPrettifier, messageFormat, timePrettifier } from './prettifier.js'

interface CustomLoggerOptions {
	enabled?: boolean
	pretty?: boolean
}

export function customLogger({ enabled = true, pretty = false }: CustomLoggerOptions) {
	let optionsOrStream: LoggerOptions | DestinationStream

	if (enabled && pretty) {
		optionsOrStream = pinoPretty({
			colorize: false,
			hideObject: true,
			ignore: 'hostname,pid,name,caller',
			messageFormat,
			customPrettifiers: {
				time: timePrettifier,
				level: levelPrettifier,
			},
		})
	} else {
		optionsOrStream = { enabled }
	}

	return pino(optionsOrStream)
}
