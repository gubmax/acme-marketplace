import { PassThrough } from 'node:stream'

import type { ReactNode } from 'react'
import { renderToPipeableStream } from 'react-dom/server'
import type { FastifyReply, FastifyRequest } from 'fastify'
import isbot from 'isbot'

const ABORT_RENDER_DELAY = 5000

export interface RenderContext {
	payload: { pageTitle?: string }
	links: Array<Record<string, unknown>>
	styles: Array<Record<string, unknown>>
	meta: Record<string, string>
	scripts: Array<Record<string, unknown>>
}

export interface RenderOptions {
	url: string
	renderContext: RenderContext
}

export type RenderFn = (options: RenderOptions) => ReactNode

export interface EntryModule {
	handleRequest: RenderFn
}

export interface RenderPageOptions {
	entryModule: EntryModule
	renderContext: RenderContext
}

export function renderPage(
	req: FastifyRequest,
	res: FastifyReply,
	options: RenderPageOptions,
): Promise<PassThrough> {
	const { entryModule, renderContext } = options

	// Inject entry context like script for client side
	renderContext.scripts.push({
		id: '__RENDER_CONTEXT__',
		type: 'application/json',
		content: JSON.stringify({
			payload: renderContext.payload,
			meta: renderContext.meta,
		}),
	})

	const node = entryModule.handleRequest({ url: req.url, renderContext })

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

		setTimeout(() => stream.abort(), ABORT_RENDER_DELAY)
	})
}
