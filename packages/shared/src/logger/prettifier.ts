import assert from 'node:assert'

import pc from 'picocolors'
import type { PinoPretty } from 'pino-pretty'

import { COLOR_BY_TYPE, LEVEL_BY_NUMBER, LogLevelWeight } from './constants.js'

interface InputData {
	[key: string]: unknown
	level: LogLevelWeight
	time: number
	pid: number
	hostname: string
	reqId: string
	req?: {
		method: string
		url: string
		hostname: string
	}
	res?: {
		statusCode: number
		method: string
		url: string
		durationMs: number
	}
	err?: Error
	msg: string
}

function baseColor(level: string | number, description: string): string {
	const levelType = LEVEL_BY_NUMBER[level]
	const baseColorFn = pc[COLOR_BY_TYPE[levelType]]
	assert(typeof baseColorFn === 'function')

	return baseColorFn(description)
}

// Prettifiers

export const timePrettifier: PinoPretty.Prettifier = (time) => {
	return typeof time === 'object' ? '' : pc.dim(time)
}

export const levelPrettifier: PinoPretty.Prettifier = (level) => {
	return typeof level === 'object' ? '' : baseColor(level, LEVEL_BY_NUMBER[level])
}

// Format message

function joinMsg(...arr: Array<string | undefined>): string {
	return arr.filter((item) => !!item).join(' ')
}

export const messageFormat: PinoPretty.MessageFormatFunc = (log) => {
	const input = log as InputData

	const { msg, req, res } = input
	const prettyTransport = pc.dim('http')

	// Request
	if (req) {
		return joinMsg(prettyTransport, pc.dim('<--'), req.method, pc.dim('xxx'), req.url)
	}

	// Response
	if (res) {
		const colorFn = res.statusCode >= 500 ? pc.red : res.statusCode >= 300 ? pc.yellow : pc.green
		const ms = res.durationMs ? pc.dim(`${Math.round(res.durationMs)}ms`) : ''

		return joinMsg(
			prettyTransport,
			colorFn('-->'),
			res.method,
			colorFn(res.statusCode),
			res.url,
			ms,
		)
	}

	// Error
	if (input.err) {
		const { level, err } = input
		const prettyDesc = baseColor(level, err.message)
		return joinMsg(prettyDesc, msg, '\n', err.stack ?? '')
	}

	// Info
	return joinMsg(msg)
}
