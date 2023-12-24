import { PassThrough } from 'node:stream'

import type { ReactNode } from 'react'
import { renderToPipeableStream } from 'react-dom/server'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { isbot } from 'isbot'

const ABORT_RENDER_DELAY = 5000

export function renderPage(
	req: FastifyRequest,
	res: FastifyReply,
	node: ReactNode,
): Promise<PassThrough> {
	const ua = typeof req.headers === 'object' ? req.headers['user-agent'] : null
	const callbackName = !ua || isbot(ua) ? 'onAllReady' : 'onShellReady'

	let didError = false
	return new Promise((resolve, reject) => {
		const stream = renderToPipeableStream(node, {
			[callbackName]() {
				const body = new PassThrough()
				if (didError) res.statusCode = 500
				void res.type('text/html')
				resolve(body)
				stream.pipe(body)
			},
			onShellError(err) {
				reject(err)
			},
			onError(err) {
				didError = true
				console.error(err)
			},
		})

		setTimeout(() => {
			stream.abort()
		}, ABORT_RENDER_DELAY)
	})
}
